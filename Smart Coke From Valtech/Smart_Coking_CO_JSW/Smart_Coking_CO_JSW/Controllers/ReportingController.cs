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
    public class ReportingController : Controller
    {
        String ConnectionString = ConfigurationManager.ConnectionStrings["DBConnction"].ConnectionString;
        // GET: Reporting
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Reporting_View()
        {
            return View();
        }
        //Charging and pushing 
        public JsonResult Reporting_Data_View()
        {
            try
            {


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                string html_Cr = "";
                string html_Pr = "";
                SqlCommand cmd = new SqlCommand("SELECT TOP (10000) * FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] order by ID Desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
             
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html_Cr += "['" + dt.Rows[i]["TIMEFIELD"] + "','" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["CHARGECAR"] + "'],";

                    }
                }

                html_Cr = html_Cr.Substring(0, Math.Max(0, html_Cr.Length - 1));
                cmd = new SqlCommand("SELECT TOP (10000) * FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME is not null order by ID Desc", con);
                dt = new DataTable();
                Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {

                        html_Pr += "['" + dt.Rows[i]["PUSHEDTIME"] + "','" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["PUSHERCAR"] + "'],";
                    }
                }


                html_Pr = html_Pr.Substring(0, Math.Max(0, html_Pr.Length - 1));

                con.Close();

                return Json(new { html_Cr, html_Pr }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);

            }

        }
        public JsonResult Reporting_DateSelection_View(string SelectToday, string SelectYesterday)
        {
            try
            {
                SelectToday = SelectToday.Replace("T", " ");
                SelectYesterday = SelectYesterday.Replace("T", " ");

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT TOP (10000) * FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where TIMEFIELD between '" + SelectYesterday + "' And '" + SelectToday + "'  order by ID Desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                string html_Cr = "";
                string html_Pr = "";
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html_Cr += "['" + dt.Rows[i]["TIMEFIELD"] + "','" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["CHARGECAR"] + "'],";

                    }
                }

                html_Cr = html_Cr.Substring(0, Math.Max(0, html_Cr.Length - 1));
                cmd = new SqlCommand("SELECT TOP (10000) * FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SelectYesterday + "' And '" + SelectToday + "'  order by ID Desc", con);
                dt = new DataTable();
                Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
           
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                      

                        html_Pr += "['" + dt.Rows[i]["PUSHEDTIME"] + "','" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["PUSHERCAR"] + "'],";
                    }
                }
                html_Pr = html_Pr.Substring(0, Math.Max(0, html_Pr.Length - 1));

                con.Close();

                return Json(new { html_Cr, html_Pr }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);

            }
        }


        //Production
        public JsonResult Proction_View(string From_Date,string To_Date)
        {
            try
            {
                From_Date = From_Date.Replace("T", " ");
                To_Date = To_Date.Replace("T", " ");
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                string html_Pc = "";              
                SqlCommand cmd = new SqlCommand("SELECT  *   FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where PushedTime between '"+ From_Date + "' and '"+To_Date+"' order by ID desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html_Pc += "['" + dt.Rows[i]["TIMEFIELD"] + "','" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["PushedTime"] + "','" + dt.Rows[i]["Coking_Time_A"] + "','" + dt.Rows[i]["PushingGap_A"] + "'],";

                    }
                }

                html_Pc = html_Pc.Substring(0, Math.Max(0, html_Pc.Length - 1));
              
                con.Close();

                return Json(new { html_Pc }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);

            }

        }

        //Daily Report
        public JsonResult Daily_Report(string From_Date, string To_Date)
        {
            try
            {
                DateTime FromDate_M =Convert.ToDateTime(From_Date);
                string Fromdate_Mo = FromDate_M.ToString("yyyy-MM-dd 06:00.00");
                string ToDate = FromDate_M.AddDays(1).ToString("yyyy-MM-dd 05:59.59");
        
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                string html_Daily = "";
                SqlCommand cmd = new SqlCommand("SELECT  * FROM [SmartCoking_CO_JSW].[dbo].[DailyReport] where convert(varchar,Datestamp,120)like '"+"%"+ From_Date + "%"+"' order by ID desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html_Daily += "['" + dt.Rows[i]["Datestamp"] + "','" + dt.Rows[i]["Types"] + "','" + dt.Rows[i]["Ashift"] + "','" + dt.Rows[i]["Bshift"] + "','" + dt.Rows[i]["Cshift"] + "','" + dt.Rows[i]["Total"] + "','" + dt.Rows[i]["Target"] + "','" + dt.Rows[i]["Performances"] + "'],";

                    }
                }

                html_Daily = html_Daily.Substring(0, Math.Max(0, html_Daily.Length - 1));

                con.Close();

                return Json(new { html_Daily }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);

            }

        }

        //Control Flue Temp
        public JsonResult ControlFlueTemp_Report(string From_Date, string To_Date)
        {
            try
            {
                From_Date = From_Date.Replace("T", " ");
                To_Date = To_Date.Replace("T", " ");
                //DateTime FromDate_M = Convert.ToDateTime(From_Date);
                //string Fromdate_Mo = FromDate_M.ToString("yyyy-MM-dd 06:00.00");
                //string ToDate = FromDate_M.AddDays(1).ToString("yyyy-MM-dd 05:59.59");

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                string html_CFlue = "";
                SqlCommand cmd = new SqlCommand("SELECT * FROM [SmartCoking_CO_JSW].[dbo].[ControlFlueTemperature] where TimeStamp between '" + From_Date + "' and '" + To_Date + "' order by ID desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html_CFlue += "['" + dt.Rows[i]["TimeStamp"] + "','" + dt.Rows[i]["Oven"] + "','" + dt.Rows[i]["AvgCFT"] + "','" + dt.Rows[i]["AvgCFT_PS"] + "','" + dt.Rows[i]["AvgCFT_CS"] + "','" + dt.Rows[i]["DevCFT"] + "','" + dt.Rows[i]["DevCFT_PS"] + "','" + dt.Rows[i]["DevCFT_CS"] + "'],";

                    }
                }

                html_CFlue = html_CFlue.Substring(0, Math.Max(0, html_CFlue.Length - 1));

                con.Close();

                return Json(new { html_CFlue }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);

            }

        }

        //Moisturiser preferred 
        public JsonResult Moisturiser_Report(string From_Date, string To_Date)
        {
            try
            {
                From_Date = From_Date.Replace("T", " ");
                To_Date = To_Date.Replace("T", " ");
                //DateTime FromDate_M = Convert.ToDateTime(From_Date);
                //string Fromdate_Mo = FromDate_M.ToString("yyyy-MM-dd 06:00.00");
                //string ToDate = FromDate_M.AddDays(1).ToString("yyyy-MM-dd 05:59.59");

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                string html_Ms = "";
                SqlCommand cmd = new SqlCommand("SELECT *  FROM [SmartCoking_CO_JSW].[dbo].[OVENMaintenance] where Timestamp between '" + From_Date + "' and '" + To_Date + "' order by ID desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html_Ms += "['" + dt.Rows[i]["Timestamp"] + "','" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["MaintenanceStatus"] + "'],";

                    }
                }

                html_Ms = html_Ms.Substring(0, Math.Max(0, html_Ms.Length - 1));

                con.Close();

                return Json(new { html_Ms }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);

            }

        }
        //NPT
        public JsonResult Npt_Report(string From_Date, string To_Date)
        {
            try
            {
                From_Date = From_Date.Replace("T", " ");
                To_Date = To_Date.Replace("T", " ");
                //DateTime FromDate_M = Convert.ToDateTime(From_Date);
                //string Fromdate_Mo = FromDate_M.ToString("yyyy-MM-dd 06:00.00");
                //string ToDate = FromDate_M.AddDays(1).ToString("yyyy-MM-dd 05:59.59");

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                string html_Npt = "";
                SqlCommand cmd = new SqlCommand("SELECT  [ID],[CokeDate],[Estimation_NPT],[Running_NPT],[Comment],[Note] FROM [SmartCoking_CO_JSW].[dbo].[Calculette_NPT]  where CokeDate between '" + From_Date + "' and '" + To_Date + "' order by ID desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html_Npt += "['" + dt.Rows[i]["CokeDate"] + "','" + dt.Rows[i]["Estimation_NPT"] + "','" + dt.Rows[i]["Running_NPT"] + "','" + dt.Rows[i]["Comment"] + "','" + dt.Rows[i]["Note"] + "'],";

                    }
                }

                html_Npt = html_Npt.Substring(0, Math.Max(0, html_Npt.Length - 1));

                con.Close();

                return Json(new { html_Npt }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);

            }

        }
    }
}