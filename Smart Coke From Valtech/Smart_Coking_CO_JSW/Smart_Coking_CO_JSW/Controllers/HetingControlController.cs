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
    public class HetingControlController : Controller
    {
        String ConnectionString = ConfigurationManager.ConnectionStrings["DBConnction"].ConnectionString;
        // GET: HetingControl
  
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Schedhuling() 
        {
            return View();
        
        }
        public  JsonResult DalyData()
        { 
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("select * FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where CalculatePushingTime < '"+DateTime.Now+"'", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                string html = "";
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        //html += "['" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["TIMEFIELD"] + "','" + dt.Rows[i]["CalculatePushingTime"] + "', '" + dt.Rows[i]["CokingTime"] + "','" + dt.Rows[i]["PushingGap"] + "','" + dt.Rows[i]["PushedTime"] + "','" + dt.Rows[i]["Coking_Time_A"] + "','" + dt.Rows[i]["PushingGap_A"] + "','" + dt.Rows[i]["DelayTime"] + "','" + dt.Rows[i]["CalculatePushingTime_M"] + "','" + dt.Rows[i]["Comment"] + "','<a onclick=fnEdit(" + dt.Rows[i]["ID"] + ")><b>Edit</b></a>'],";
                        html += "['" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["TIMEFIELD"] + "','" + dt.Rows[i]["CalculatePushingTime"] + "', '" + dt.Rows[i]["CokingTime"] + "','" + dt.Rows[i]["PushingGap"] + "','" + dt.Rows[i]["PushedTime"] + "','" + dt.Rows[i]["Coking_Time_A"] + "','" + dt.Rows[i]["PushingGap_A"] + "','" + dt.Rows[i]["DelayTime"] + "','" + dt.Rows[i]["CalculatePushingTime_M"] + "','" + dt.Rows[i]["Comment"] + "','<a class=\"edit-link\" onclick=fnEdit(" + dt.Rows[i]["ID"] + ")><b>Edit</b></a>'],";

                        //html += "['" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["TIMEFIELD"] + "', '<input type=\"checkbox\" name=\"calculatePushingTime\" value=\"" + dt.Rows[i]["CalculatePushingTime"] + "\">', '" + dt.Rows[i]["CokingTime"] + "','" + dt.Rows[i]["PushingGap"] + "','" + dt.Rows[i]["PushedTime"] + "','" + dt.Rows[i]["Coking_Time_A"] + "','" + dt.Rows[i]["PushingGap_A"] + "','" + dt.Rows[i]["DelayTime"] + "','" + dt.Rows[i]["CalculatePushingTime_M"] + "','" + dt.Rows[i]["Comment"] + "','<a class=\"edit-link\" onclick=fnEdit(" + dt.Rows[i]["ID"] + ")><b>Edit</b></a>'],";

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


        public  JsonResult Param_scheduling()
        {
            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();

            SqlCommand cmd1 = new SqlCommand("select * FROM [SmartCoking_CO_JSW].[dbo].[PARAM_SCHEDULING]", con);
            DataTable dt1 = new DataTable();
            SqlDataAdapter Dta1 = new SqlDataAdapter(cmd1);
            Dta1.SelectCommand = cmd1;
            DataSet dataset = new DataSet();
            Dta1.Fill(dataset);
            SqlDataReader sdr1 = cmd1.ExecuteReader();

            //DATABASE PARAMETER SETTING
            if (sdr1.Read())
            {
               

                string S_ASHIFT_START = dataset.Tables[0].Rows[0]["ASHIFT_START"].ToString();
                string S_ASHIFT_END = dataset.Tables[0].Rows[0]["ASHIFT_END"].ToString();
                string S_BSHIFT_START = dataset.Tables[0].Rows[0]["BSHIFT_START"].ToString();
                string S_BSHIFT_END = dataset.Tables[0].Rows[0]["BSHIFT_END"].ToString();
                string S_CSHIFT_START = dataset.Tables[0].Rows[0]["CSHIFT_START"].ToString();
                string S_CSHIFT_END = dataset.Tables[0].Rows[0]["CSHIFT_END"].ToString();
                string S_ASHIFT_BREAK_START = dataset.Tables[0].Rows[0]["ASHIFT_BREAK_START"].ToString();
                string S_ASHIFT_BREAK_END = dataset.Tables[0].Rows[0]["ASHIFT_BREAK_END"].ToString();
                string S_BSHIFT_BREAK_START = dataset.Tables[0].Rows[0]["BSHIFT_BREAK_START"].ToString();
                string S_BSHIFT_BREAK_END = dataset.Tables[0].Rows[0]["BSHIFT_BREAK_END"].ToString();
                string S_CSHIFT_BREAK_START = dataset.Tables[0].Rows[0]["CSHIFT_BREAK_START"].ToString();
                string S_CSHIFT_BREAK_END = dataset.Tables[0].Rows[0]["CSHIFT_BREAK_END"].ToString();
                string S_ASHIFT2_BREAK_START = dataset.Tables[0].Rows[0]["ASHIFT2_BREAK_START"].ToString();
                string S_ASHIFT2_BREAK_END = dataset.Tables[0].Rows[0]["ASHIFT2_BREAK_END"].ToString();
                string S_BSHIFT2_BREAK_START = dataset.Tables[0].Rows[0]["BSHIFT2_BREAK_START"].ToString();
                string S_BSHIFT2_BREAK_END = dataset.Tables[0].Rows[0]["BSHIFT2_BREAK_END"].ToString();
                string S_CSHIFT2_BREAK_START = dataset.Tables[0].Rows[0]["CSHIFT2_BREAK_START"].ToString();
                string S_CSHIFT2_BREAK_END = dataset.Tables[0].Rows[0]["CSHIFT2_BREAK_END"].ToString();
                string S_BREAK_ONE_START = dataset.Tables[0].Rows[0]["BREAK_ONE_START"].ToString();
                string S_BREAK_ONE_END = dataset.Tables[0].Rows[0]["BREAK_ONE_END"].ToString();
                string S_BREAK_TWO_START = dataset.Tables[0].Rows[0]["BREAK_TWO_START"].ToString();
                string S_BREAK_TWO_END = dataset.Tables[0].Rows[0]["BREAK_TWO_END"].ToString();
                string S_BREAK_THREE_START = dataset.Tables[0].Rows[0]["BREAK_THREE_START"].ToString();
                string S_BREAK_THREE_END = dataset.Tables[0].Rows[0]["BREAK_THREE_END"].ToString();
                string S_ASHIFT2_START = dataset.Tables[0].Rows[0]["ASHIFT2_START"].ToString();
                string S_ASHIFT2_END = dataset.Tables[0].Rows[0]["ASHIFT2_END"].ToString();
                string S_BSHIFT2_START = dataset.Tables[0].Rows[0]["BSHIFT2_START"].ToString();
                string S_BSHIFT2_END = dataset.Tables[0].Rows[0]["BSHIFT2_END"].ToString();
                string S_CSHIFT2_START = dataset.Tables[0].Rows[0]["CSHIFT2_START"].ToString();
                string S_CSHIFT2_END = dataset.Tables[0].Rows[0]["CSHIFT2_END"].ToString();
                sdr1.Close();
                return Json(new { S_ASHIFT_START, S_ASHIFT_END, S_BSHIFT_START, S_BSHIFT_END, S_CSHIFT_START, S_CSHIFT_END }, JsonRequestBehavior.AllowGet);

            }

            return Json("Fail", JsonRequestBehavior.AllowGet);

        }





        public  JsonResult A_Shift_Data(string S_ASHIFT_START,string S_ASHIFT_END,string S_BSHIFT_START,string S_BSHIFT_END,string S_CSHIFT_START,string S_CSHIFT_END )
        {
            try
            {
               

                   SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("select * FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where CalculatePushingTime  between  '" + S_ASHIFT_START + "' and '"+ S_ASHIFT_END + "'", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                string html = "";
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html += "['" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["TIMEFIELD"] + "','" + dt.Rows[i]["CalculatePushingTime"] + "', '" + dt.Rows[i]["CokingTime"] + "','" + dt.Rows[i]["PushingGap"] + "','" + dt.Rows[i]["PushedTime"] + "','" + dt.Rows[i]["Coking_Time_A"] + "','" + dt.Rows[i]["PushingGap_A"] + "','" + dt.Rows[i]["DelayTime"] + "','" + dt.Rows[i]["CalculatePushingTime_M"] + "','" + dt.Rows[i]["Comment"] + "'],";


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

        public JsonResult B_Shift_Data(string S_ASHIFT_START, string S_ASHIFT_END, string S_BSHIFT_START, string S_BSHIFT_END, string S_CSHIFT_START, string S_CSHIFT_END)
        {
            try
            {
              

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("select * FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where TIMEFIELD  between  '" + S_BSHIFT_START + "' and '" + S_BSHIFT_END + "'", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                string html = "";
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html += "['" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["TIMEFIELD"] + "','" + dt.Rows[i]["CalculatePushingTime"] + "', '" + dt.Rows[i]["CokingTime"] + "','" + dt.Rows[i]["PushingGap"] + "','" + dt.Rows[i]["PushedTime"] + "','" + dt.Rows[i]["Coking_Time_A"] + "','" + dt.Rows[i]["PushingGap_A"] + "','" + dt.Rows[i]["DelayTime"] + "','" + dt.Rows[i]["CalculatePushingTime_M"] + "','" + dt.Rows[i]["Comment"] + "'],";


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

      
        public JsonResult C_Shift_Data(string S_ASHIFT_START, string S_ASHIFT_END, string S_BSHIFT_START, string S_BSHIFT_END, string S_CSHIFT_START, string S_CSHIFT_END)
        {
            try
            {


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("select * FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where TIMEFIELD  between  '" + S_CSHIFT_START + "' and '" + S_CSHIFT_END + "'", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                string html = "";
                if (dt.Rows.Count > 0)
                {
                    int i;
                    for (i = 0; i < dt.Rows.Count; i++)
                    {
                        html += "['" + dt.Rows[i]["OVEN"] + "','" + dt.Rows[i]["TIMEFIELD"] + "','" + dt.Rows[i]["CalculatePushingTime"] + "', '" + dt.Rows[i]["CokingTime"] + "','" + dt.Rows[i]["PushingGap"] + "','" + dt.Rows[i]["PushedTime"] + "','" + dt.Rows[i]["Coking_Time_A"] + "','" + dt.Rows[i]["PushingGap_A"] + "','" + dt.Rows[i]["DelayTime"] + "','" + dt.Rows[i]["CalculatePushingTime_M"] + "','" + dt.Rows[i]["Comment"] + "'],";


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
        int LastPushOven_N = 0;  
        int NextOven = 0;   
        int CokegasCV = 0;
        int MixedgasCV = 0;
        int CokegasFlow_PS = 0;
        int CokegasFlow_CS = 0;
        int MIXGASFlow_PS = 0;
        int MIXGASFlow_CS = 0;
        int WGASTEMP1 = 0;
        int WGASTEMP2 = 0;
        int AShiftTotalCount = 0;
        int BShiftTotalCount = 0;
        int CShiftTotalCount = 0;
        int RunningNPT = 0;
        int Target = 0;
        //int TotalCount_T = 0;
        public JsonResult LastPushOven()
        {
            try
            {



                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                string S_ASHIFT_START_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 06:00.00");
                string S_ASHIFT_END_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 13:59.59");
                string S_BSHIFT_START_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 14:00.00");
                string S_BSHIFT_END_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 21:59.59");
                string S_CSHIFT_START_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 22:00.00");
                string S_CSHIFT_END_1 = DateTime.Now.AddHours(-6).AddDays(1).ToString("yyyy-MM-dd 05:59.59");

                SqlCommand cmd1 = new SqlCommand("select Top(1) OVEN,PUSHEDTIME FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where PUSHEDTIME is not null order by PUSHEDTIME desc", con);
                cmd1.ExecuteNonQuery();
                SqlDataReader SqlReder = cmd1.ExecuteReader();
                if (SqlReder.Read())
                {
                    LastPushOven_N = Convert.ToInt16(SqlReder["OVEN"]);
                }
                SqlReder.Close();

                SqlCommand cmd3 = new SqlCommand("select Top(1) *from [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME is null", con);
                cmd3.ExecuteNonQuery();
                SqlDataReader SqlReder3 = cmd3.ExecuteReader();
                if (SqlReder3.Read())
                {
                    NextOven = Convert.ToInt16(SqlReder3["OVEN"]);

                }
                SqlReder3.Close();

                SqlCommand cmd4 = new SqlCommand("SELECT TOP (1) [TIMEFIELD],[CokegasCV],[MixedgasCV],[CokegasFlow_PS] ,[CokegasFlow_CS],[MIXGASFlow_PS],[MIXGASFlow_CS],[WGASTEMP1],[WGASTEMP2] FROM [SmartCoking_CO_JSW].[dbo].[CYCDATA] order by TIMEFIELD desc", con);
                cmd4.ExecuteNonQuery();
                SqlDataReader SqlReder4 = cmd4.ExecuteReader();
                if (SqlReder4.Read())
                {
                    CokegasCV = Convert.ToInt16(SqlReder4["CokegasCV"]);
                    MixedgasCV = Convert.ToInt16(SqlReder4["MixedgasCV"]);
                    CokegasFlow_PS = Convert.ToInt16(SqlReder4["CokegasFlow_PS"]);
                    CokegasFlow_CS = Convert.ToInt16(SqlReder4["CokegasFlow_CS"]);
                    MIXGASFlow_PS = Convert.ToInt16(SqlReder4["MIXGASFlow_PS"]);
                    MIXGASFlow_CS = Convert.ToInt16(SqlReder4["MIXGASFlow_CS"]);
                    WGASTEMP1 = Convert.ToInt16(SqlReder4["WGASTEMP1"]);
                    WGASTEMP2 = Convert.ToInt16(SqlReder4["WGASTEMP2"]);
                }
                SqlReder4.Close();

                SqlCommand cmd5 = new SqlCommand("select Count(PUSHEDTIME) As Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] WITH (NOLOCK) where   PUSHEDTIME  between '" + S_ASHIFT_START_1 + "' and '" + S_ASHIFT_END_1 + "' ", con);
                cmd5.ExecuteNonQuery();
                SqlDataReader SqlReder5 = cmd5.ExecuteReader();
                if (SqlReder5.Read())
                {
                    AShiftTotalCount = Convert.ToInt16(SqlReder5["Count"]);
                }
                SqlReder5.Close();
                SqlCommand cmd6 = new SqlCommand("select Count(PUSHEDTIME) As Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] WITH (NOLOCK) where   PUSHEDTIME  between '" + S_BSHIFT_START_1 + "' and '" + S_BSHIFT_END_1 + "' ", con);
                cmd6.ExecuteNonQuery();
                SqlDataReader SqlReder6 = cmd6.ExecuteReader();
                if (SqlReder6.Read())
                {
                    BShiftTotalCount = Convert.ToInt16(SqlReder6["Count"]);
                }
                SqlReder6.Close();

                SqlCommand cmd7 = new SqlCommand("select Count(PUSHEDTIME) As Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] WITH (NOLOCK) where   PUSHEDTIME  between '" + S_CSHIFT_START_1 + "' and '" + S_CSHIFT_END_1 + "' ", con);
                cmd7.ExecuteNonQuery();
                SqlDataReader SqlReder7 = cmd7.ExecuteReader();
                if (SqlReder7.Read())
                {
                    CShiftTotalCount = Convert.ToInt16(SqlReder7["Count"]);
                }
                SqlReder7.Close();
                SqlCommand cmd8 = new SqlCommand("SELECT TOP (1)[Running_NPT] FROM [SmartCoking_CO_JSW].[dbo].[Calculette_NPT] order by ID desc", con);
                cmd8.ExecuteNonQuery();
                SqlDataReader SqlReder8 = cmd8.ExecuteReader();
                if (SqlReder8.Read())
                {
                    RunningNPT = Convert.ToInt16(SqlReder8["Running_NPT"]);
                }

                SqlReder8.Close();
                SqlCommand cmd9 = new SqlCommand("select X8  FROM [SmartCoking_CO_JSW].[dbo].[Temporary]  ", con);
                cmd9.ExecuteNonQuery();
                SqlDataReader SqlReder9 = cmd9.ExecuteReader();
                if (SqlReder9.Read())
                {
                    Target = Convert.ToInt16(SqlReder9["X8"]);
                }
                SqlReder9.Close();
                int TotalCount = AShiftTotalCount + BShiftTotalCount + CShiftTotalCount;
                int DailyTotalCount = TotalCount;
                con.Close();
                return Json(new { LastPushOven_N, NextOven, TotalCount, AShiftTotalCount, BShiftTotalCount, CShiftTotalCount, DailyTotalCount, Target, RunningNPT, CokegasCV, MixedgasCV, CokegasFlow_PS, CokegasFlow_CS, MIXGASFlow_PS, MIXGASFlow_CS, WGASTEMP1, WGASTEMP2 }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult TergetPush(string Terget)
        {
            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();
            SqlCommand cmd = new SqlCommand("Update [SmartCoking_CO_JSW].[dbo].[Temporary] set X8 ='"+Terget+"'", con);
            cmd.ExecuteNonQuery();
            SqlDataReader SqlReder = cmd.ExecuteReader();
            SqlReder.Read();
            con.Close();
            return Json(new {},JsonRequestBehavior.AllowGet);
        }

        public JsonResult Break_time_A_Shift(string ASHIFT_BREAK_START, string ASHIFT_BREAK_END)
        {
            string ASHIFT_BREAK_START_D = DateTime.Now.ToString("yyyy-MM-dd");
            ASHIFT_BREAK_START_D = ASHIFT_BREAK_START_D + ' ' + ASHIFT_BREAK_START;
            string ASHIFT_BREAK_END_D = DateTime.Now.ToString("yyyy-MM-dd");
            ASHIFT_BREAK_END_D = ASHIFT_BREAK_END_D + ' ' + ASHIFT_BREAK_END;

            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();
            SqlCommand cmd = new SqlCommand("Update  [SmartCoking_CO_JSW].[dbo].[PARAM_SCHEDULING] set ASHIFT_BREAK_START ='" + ASHIFT_BREAK_START_D + "',ASHIFT_BREAK_END='"+ ASHIFT_BREAK_END_D + "'", con);
            cmd.ExecuteNonQuery();
           
            return Json(new { }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Break_time_B_Shift(string BSHIFT_BREAK_START, string BSHIFT_BREAK_END)
        {
            string BSHIFT_BREAK_START_D = DateTime.Now.ToString("yyyy-MM-dd");
            BSHIFT_BREAK_START_D = BSHIFT_BREAK_START_D + ' ' + BSHIFT_BREAK_START;
            string BSHIFT_BREAK_END_D = DateTime.Now.ToString("yyyy-MM-dd");
            BSHIFT_BREAK_END_D = BSHIFT_BREAK_END_D + ' ' + BSHIFT_BREAK_END;

            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();
            SqlCommand cmd = new SqlCommand("Update  [SmartCoking_CO_JSW].[dbo].[PARAM_SCHEDULING] set BSHIFT_BREAK_START ='" + BSHIFT_BREAK_START_D + "',CSHIFT_BREAK_END='" + BSHIFT_BREAK_END_D + "'", con);
            cmd.ExecuteNonQuery();

            return Json(new { }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Break_time_C_Shift(string CSHIFT_BREAK_START, string CSHIFT_BREAK_END)
        {
            string CSHIFT_BREAK_START_D = DateTime.Now.ToString("yyyy-MM-dd");
            CSHIFT_BREAK_START_D = CSHIFT_BREAK_START_D + ' ' + CSHIFT_BREAK_START;
            string CSHIFT_BREAK_END_D = DateTime.Now.ToString("yyyy-MM-dd");
            CSHIFT_BREAK_END_D = CSHIFT_BREAK_END_D + ' ' + CSHIFT_BREAK_END;

            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();
            SqlCommand cmd = new SqlCommand("Update  [SmartCoking_CO_JSW].[dbo].[PARAM_SCHEDULING] set CSHIFT_BREAK_START ='" + CSHIFT_BREAK_START_D + "',CSHIFT_BREAK_END='" + CSHIFT_BREAK_END_D + "'", con);
            cmd.ExecuteNonQuery();

            return Json(new { }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Mnual_Editedate(string ID)
        {
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT top(1) * FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where ID ='" + ID + "'", con);
                cmd.ExecuteNonQuery();
                SqlDataReader SqlReder = cmd.ExecuteReader();
                SqlReder.Read();
                string CalculatePushingTime_M = Convert.ToString(SqlReder["CalculatePushingTime_M"]);
                int M_ID = Convert.ToInt16(SqlReder["ID"]);
                SqlReder.Close();
                SqlReder.Dispose();

                cmd = new SqlCommand("SELECT top(1) * FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where ID <'" + ID + "' order by ID desc", con);
                cmd.ExecuteNonQuery();
                SqlReder = cmd.ExecuteReader();
                SqlReder.Read();
                DateTime previousTime = Convert.ToDateTime(SqlReder["CalculatePushingTime_M"]);
                string After10Mint = previousTime.AddMinutes(10).ToString("yyyy-MM-dd HH:mm");
                string After30Mint = previousTime.AddMinutes(30).ToString("yyyy-MM-dd HH:mm");
                string previousTime_S = previousTime.ToString("yyyy-MM-dd HH:mm");
                SqlReder.Close();
                SqlReder.Dispose();



                con.Close();
                return Json(new { CalculatePushingTime_M, M_ID, After10Mint, After30Mint, previousTime_S }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Mnual_Update(string ID,string Select_MDate,string Comment_M)
        {
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                Select_MDate = Select_MDate.Replace("T", " ");

                SqlCommand cmd = new SqlCommand(" update [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] set CalculatePushingTime_M ='"+ Select_MDate + "',M_Timestamp='"+DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")+"',M_Status=2,Comment='"+Comment_M+"' where ID = "+ ID + " ", con);
                cmd.ExecuteNonQuery();
               


                con.Close();
                return Json(new { }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json("Failure", JsonRequestBehavior.AllowGet);
            }
        }


    }
}