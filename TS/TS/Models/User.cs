using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TS.Models
{
    public class User
    {
        public string username;
        public string password;
        public string name;
        public double lat;
        public double lon;
        public List<string> friends;

        public User()
        {
            friends = new List<string>();
        }
    }
}
