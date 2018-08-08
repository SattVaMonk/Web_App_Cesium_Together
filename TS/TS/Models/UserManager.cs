using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TS.Models
{
    public class UserManager
    {
        public Dictionary<string,User> users;

        public UserManager()
        {
            users = new Dictionary<string, User>();
        }

        public bool UserExist(string id)
        {
            return users.ContainsKey(id);
        }

        public bool Login(string id, string password)
        {
            if (UserExist(id))
                return users[id].password == password;

            return false;
        }

        public List<User> GetFriends(string id)
        {
            List<User> friends = new List<User>();
            friends.Add(users[id]);
            users[id].friends.ForEach(_ =>
            {
                if (users.ContainsKey(_))
                    friends.Add(users[_]);
            });
            return friends;
        }

        public void GenerateUsers()
        {
            User friend = new User()
            {
                name = "Jing",
                password = "friend",
                username = "friend",
                pic = "cat.jpg",
                lon = 121.54847,
                lat = 31.175974,
            };
            friend.friends.Add("me");
            users.Add(friend.username, friend);
            users.Add("me", new User()
            {
                name = "Anning",
                password = "me",
                username = "me",
                pic = "me.jpg",
                lon = -71.089621,
                lat = 42.335433
            });
            users["me"].friends.Add(friend.username);
        }
    }
}
