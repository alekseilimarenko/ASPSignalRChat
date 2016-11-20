using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ASPSignalRChat.Models
{
    public class User
    {
        public string ConnectionId { get; set; }

        [Display(Name = "Введите логин : ")]
        public string Name { get; set; }
    }
}