using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace TS
{

    public class WebSocketMiddleware
    {
        private static ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

        private static ConcurrentDictionary<string, WebSocket> _socketsInRoom = new ConcurrentDictionary<string, WebSocket>();

        private readonly RequestDelegate _next;

        public WebSocketMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
            {
                await _next.Invoke(context);
                return;
            }

            CancellationToken ct = context.RequestAborted;
            WebSocket currentSocket = await context.WebSockets.AcceptWebSocketAsync();
            var socketId = Guid.NewGuid().ToString();

            _sockets.TryAdd(socketId, currentSocket);

            while (true)
            {
                if (ct.IsCancellationRequested)
                {
                    break;
                }

                string response = await ReceiveStringAsync(currentSocket, ct);
                if (string.IsNullOrEmpty(response))
                {
                    if (currentSocket.State != WebSocketState.Open)
                    {
                        break;
                    }

                    continue;
                }

                if (response == "create or join")
                {
                    if (_sockets.Count == 1)
                    {
                        _socketsInRoom.TryAdd(socketId, currentSocket);
                        await SendStringAsync(currentSocket, "created");
                    }
                    else if (_sockets.Count > 1)
                    {
                        //TODo Add Join Room & List of Room
                        foreach (var member in _socketsInRoom)
                        {
                            await SendStringAsync(member.Value, "join");
                        }
                        _socketsInRoom.TryAdd(socketId, currentSocket);
                        await SendStringAsync(currentSocket, "joined");
                        foreach (var member in _socketsInRoom)
                        {
                            await SendStringAsync(member.Value, "ready");
                        }
                    }
                }
                else
                {
                    foreach (var socket in _sockets)
                    {
                        if (socket.Value.State != WebSocketState.Open || socket.Value.Equals(currentSocket))
                        {
                            continue;
                        }
                        await SendStringAsync(socket.Value, response);
                    }
                }

            }

            _sockets.TryRemove(socketId, out WebSocket dummy);

            try
            {
                ct.ThrowIfCancellationRequested();
                await currentSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", ct);
            }
            catch (OperationCanceledException) { }
            catch (WebSocketException) { }

            Console.WriteLine("Closing websocket user");
            currentSocket.Dispose();
        }

        private static Task SendStringAsync(WebSocket socket, string data, CancellationToken ct = default(CancellationToken))
        {
            var buffer = Encoding.UTF8.GetBytes(data);
            var segment = new ArraySegment<byte>(buffer);

            return socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
        }

        private static async Task<string> ReceiveStringAsync(WebSocket socket, CancellationToken ct = default(CancellationToken))
        {
            var buffer = new ArraySegment<byte>(new byte[4096]);
            using (var ms = new MemoryStream())
            {
                try
                {
                    WebSocketReceiveResult result;
                    do
                    {
                        ct.ThrowIfCancellationRequested();

                        result = await socket.ReceiveAsync(buffer, ct);
                        ms.Write(buffer.Array, buffer.Offset, result.Count);
                    }
                    while (!result.EndOfMessage);

                    ms.Seek(0, SeekOrigin.Begin);
                    if (result.MessageType != WebSocketMessageType.Text)
                    {
                        return null;
                    }

                    // Encoding UTF8: https://tools.ietf.org/html/rfc6455#section-5.6
                    using (var reader = new StreamReader(ms, Encoding.UTF8))
                    {
                        return await reader.ReadToEndAsync();
                    }
                }
                catch (OperationCanceledException) { }
                catch (WebSocketException ex) { Console.WriteLine(ex.WebSocketErrorCode); }
            }
            return null;
        }
    }

}
