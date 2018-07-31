using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TS.Models
{
    public class UserManager
    {
        public List<User> users;

        public UserManager()
        {
            users = new List<User>();
        }

        public void GenerateUsers()
        {
            User friend = new User()
            {
                name = "friend",
                id = 0002,
                lon = 121.54847,
                lat = 31.175974,
            };
            users.Add(new User()
            {
                name = "me",
                id = 0001,
                lon = -71.089621,
                lat = 42.335433
            });
            users[0].friends.Add(friend);
        }
    }
}
