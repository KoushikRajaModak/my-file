using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Net;
using System.Data.SqlClient;
using System.Data;
using System.Data.Common;

namespace Smart_Coking_CO_JSW.Controllers
{
    public class HomeController : Controller
    {
        String ConnectionString = ConfigurationManager.ConnectionStrings["DBConnction"].ConnectionString;

       
        public ActionResult Index()
        {
            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT tOP(1)* FROM [SmartCoking_CO_JSW].[dbo].[PARAM_SCHEDULING]  ", con);
            cmd.ExecuteNonQuery();
            SqlDataReader Rs = cmd.ExecuteReader();
            Rs.Read();
            var usernameDB = Rs[1];
            var passwordDB = Rs[2];
            Rs.Close();
            con.Close();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}