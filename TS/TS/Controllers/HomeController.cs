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
            UserManager um = new UserManager();
            um.GenerateUsers();
            //ViewData["User"] = JsonConvert.SerializeObject(um.users[0]);
            return View(um.users[0]);
        }
        
    }
}
