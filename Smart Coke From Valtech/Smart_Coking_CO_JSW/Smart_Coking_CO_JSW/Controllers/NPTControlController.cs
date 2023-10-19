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

namespace Smart_Coking_CO_JSW.Controllers
{
    public class NPTControlController : Controller
    {
        String ConnectionString = ConfigurationManager.ConnectionStrings["DBConnction"].ConnectionString;
        // GET: NPTControl
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult NPTControl ()
        {
            return View();
        }
        public JsonResult NPTValuShow()
        {
            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();

            SqlCommand cmd = new SqlCommand("select TOP (1) [NPT] FROM [SmartCoking_CO_JSW].[dbo].[CokingControl] order by ID desc", con);
            DataTable dt = new DataTable();
            SqlDataAdapter Dta = new SqlDataAdapter(cmd);
            Dta.Fill(dt);
            string NPTValue =null;
            if (dt.Rows.Count > 0)
            {
                int i;
                for (i = 0; i < dt.Rows.Count; i++)
                {
                    NPTValue = Convert.ToString( dt.Rows[i]["NPT"] );


                }
            }
            con.Close();
            return Json(new { NPTValue }, JsonRequestBehavior.AllowGet);
        }

      

        public JsonResult NPTAnalityes ()
        {
            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();

            SqlCommand cmd = new SqlCommand("select TOP (30) [Running_NPT],[CokeDate],[Estimation_NPT] FROM [SmartCoking_CO_JSW].[dbo].[Calculette_NPT]order by ID desc", con);
            DataTable dt = new DataTable();
            SqlDataAdapter Dta = new SqlDataAdapter(cmd);
            Dta.Fill(dt);
            List<int> NPTValue = new List<int>();
            List<string> CokeDate = new List<string>();
            List<int> Estimation_NPT = new List<int>();

                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        NPTValue.Add(int.Parse(dt.Rows[i]["Running_NPT"].ToString()));
                        CokeDate.Add(dt.Rows[i]["CokeDate"].ToString());
                        Estimation_NPT.Add(int.Parse(dt.Rows[i]["Estimation_NPT"].ToString()));
                    }
                }

            con.Close();
            return Json(new { NPTValue, CokeDate, Estimation_NPT }, JsonRequestBehavior.AllowGet);
        }

       public JsonResult NPT_Data_View()
        {
            try
            {


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("select* from [SmartCoking_CO_JSW].[dbo].[Calculette_NPT] order by ID desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                string html = "";
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html += "['" + dt.Rows[i]["CokeDate"] + "','" + dt.Rows[i]["Running_NPT"] + "','" + dt.Rows[i]["Estimation_NPT"] + "','" + dt.Rows[i]["Comment"] + "','" + dt.Rows[i]["Note"] + "'],";


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

    }
}