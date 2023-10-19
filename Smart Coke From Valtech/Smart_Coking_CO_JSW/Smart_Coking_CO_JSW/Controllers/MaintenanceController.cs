using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Net;
using System.Web.UI.WebControls;
using System.Runtime.Remoting.Services;

namespace Smart_Coking_CO_JSW.Controllers
{
    public class MaintenanceController : Controller
    {
        // GET: Maintenance

        String ConnectionString = ConfigurationManager.ConnectionStrings["DBConnction"].ConnectionString;
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Maintenance_View()
        {
            return View();

        }


        public  JsonResult Maintenance_Data_View( string Selct_Oven)
        {
            try
            {
               

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT* FROM [SmartCoking_CO_JSW].[dbo].[OVENMaintenance] where OVEN = "+ Selct_Oven + " and MaintenanceStatus is not null order by ID desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                string html = "";
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html += "['" + dt.Rows[i]["Timestamp"] + "','" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["MaintenanceStatus"] + "'],";


                    }
                }

                html = html.Substring(0, Math.Max(0, html.Length - 1));
                con.Close();

                return Json(new { html }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Maintenance_DateData_View(string SelectToday,string SelectYesterday)
        {
            try
            {


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT *  FROM [SmartCoking_CO_JSW].[dbo].[OVENMaintenance] where Timestamp between '"+ SelectYesterday + "' And '"+ SelectToday + "' order by ID desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                string html_D = "";
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html_D += "['" + dt.Rows[i]["Timestamp"] + "','" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["MaintenanceStatus"] + "'],";


                    }
                }

                html_D = html_D.Substring(0, Math.Max(0, html_D.Length - 1));
                con.Close();

                return Json(new { html_D }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
        }

    }
}