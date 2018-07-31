using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TS.Models
{
    public class User
    {
        public int id;
        public string name;
        public double lat;
        public double lon;
        public List<User> friends;

        public User()
        {
            friends = new List<User>();
        }
    }
}
