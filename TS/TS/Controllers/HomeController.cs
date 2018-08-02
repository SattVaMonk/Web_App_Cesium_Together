using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TS.Models;
using Newtonsoft.Json;

namespace TS.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public string Login(string username, string password)
        {
            UserManager um = new UserManager();
            um.GenerateUsers();
            if (um.Login(username, password))
                return JsonConvert.SerializeObject(um.GetFriends(username));
            return "404";
        }

    }
}
