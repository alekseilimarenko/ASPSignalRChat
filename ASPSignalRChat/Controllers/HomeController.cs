using System.Web.Mvc;
using ASPSignalRChat.Models;

namespace ASPSignalRChat.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}