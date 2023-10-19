using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Net;
using System.Drawing;
using Antlr.Runtime;

namespace Smart_Coking_CO_JSW.Controllers
{
    public class AnalysisController : Controller
    {
        String ConnectionString = ConfigurationManager.ConnectionStrings["DBConnction"].ConnectionString;
        private object Date1=0; private object Date2=0; private object Date3 = 0;

        public string Apri_Day { get; private set; }

        // GET: Analysis
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Graphs()
        {
            return View();  
        }
        public ActionResult Trends()
        {
            return View();
        }
        //Trends section ---
        public JsonResult Current(string SelectOven, string date_1)
        {

            try
            {


                int j;
                int k;

              
               
                List<int> Totalcurrent = new List<int>();
                List<float> Current3 = new List<float>();
                List<float> Current2 = new List<float>();
                List<float> Current1 = new List<float>();
                List<float> TEMP3 = new List<float>();
                List<float> TEMP4 = new List<float>();
                List<float> TEMP5 = new List<float>();

                



                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT *  FROM [SmartCoking_CO_JSW].[dbo].[CURRENTS] where OVEN = '"+ SelectOven + "' and CONVERT(varchar, PUSHSTART ,120)like '"+"%"+ date_1 +"%"+"' ", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;

                if (k > 0)
                {
                    for (j = 3; j < 103; j++)
                    {
                        //Current1.Add(float.Parse(dt.Rows[0][j].ToString()));
                        string currentValue = dt.Rows[0][j].ToString();
                        float parsedValue = 0.0f;

                        if (!string.IsNullOrEmpty(currentValue) && float.TryParse(currentValue, out parsedValue))
                        {
                            Current1.Add(parsedValue);
                        }
                        else
                        {
                            Current1.Add(0.0f); // If the value is null or cannot be parsed, add 0.
                        }

                        Date1 = dt.Rows[0][1].ToString();

                    }
                }
                if (k > 1)
                {
                    for (j = 3; j < 103; j++)
                    {
                        string currentValue2 = dt.Rows[0][j].ToString();
                        float parsedValue2 = 0.0f;

                        if (!string.IsNullOrEmpty(currentValue2) && float.TryParse(currentValue2, out parsedValue2))
                        {
                            Current2.Add(parsedValue2);
                        }
                        else
                        {
                            Current2.Add(0.0f); // If the value is null or cannot be parsed, add 0.
                        }
                        //Current2.Add(float.Parse(dt.Rows[1][j].ToString()));
                        Date2 = dt.Rows[1][1].ToString();

                    }
                }
                if (k > 2)
                {
                    for (j = 3; j < 103; j++)
                    {
                        string currentValue3 = dt.Rows[0][j].ToString();
                        float parsedValue3 = 0.0f;

                        if (!string.IsNullOrEmpty(currentValue3) && float.TryParse(currentValue3, out parsedValue3))
                        {
                            Current3.Add(parsedValue3);
                        }
                        else
                        {
                            Current3.Add(0.0f); // If the value is null or cannot be parsed, add 0.
                        }
                        //Current3.Add(float.Parse(dt.Rows[2][j].ToString()));
                        Date3 = dt.Rows[2][1].ToString();
                    }
                }
                for (int i = 1; i <= 100; i++)
                {

                    Totalcurrent.Add(i);
                }

                return Json(new {Date1,Date2,Date3, Totalcurrent, Current1, Current2, Current3 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }



        }
        public JsonResult Control_Flue_Temp_Daily(string From_Date, string To_Date)
        {

            try
            {

                int j;
                int k;

                List<string> TimeStamp = new List<string>();
                List<int> Oven = new List<int>();
              
                List<float> AvgCFT_PS = new List<float>();
                List<float> AvgCFT_CS = new List<float>();
               

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("select * FROM [SmartCoking_CO_JSW].[dbo].[ControlFlueTemperature] where CONVERT(varchar, TimeStamp ,120)like'" + "%" + From_Date + "%" + "' ", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;
                k = k - 1;

                for (j = 0; j <= k; j++)
                {
                    TimeStamp.Add(dt.Rows[j]["TimeStamp"].ToString());
                    Oven.Add(int.Parse(dt.Rows[j]["Oven"].ToString()));
                    AvgCFT_PS.Add(float.Parse(dt.Rows[j]["AvgCFT_PS"].ToString()));
                    AvgCFT_CS.Add(float.Parse(dt.Rows[j]["AvgCFT_CS"].ToString()));
                }

                return Json(new { TimeStamp, Oven, AvgCFT_PS, AvgCFT_CS }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult Control_Flue_Temp_AllOven(string From_Date, string ToDaes,string SelectOven)
        {

            try
            {


               DateTime SelectDate=Convert.ToDateTime(From_Date);
                string SelectDate_M = SelectDate.ToString("yyyy-MM-dd 00:01");
                
               DateTime calculetday =SelectDate.AddDays(Convert.ToInt16(ToDaes));
                string calculetday_M = calculetday.ToString("yyyy-MM-dd 23:59");
               
                int j;
                int k;

                List<string> TimeStamp = new List<string>();
                List<int> Oven = new List<int>();

                List<float> AvgCFT_PS = new List<float>();
                List<float> AvgCFT_CS = new List<float>();


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("select * FROM [SmartCoking_CO_JSW].[dbo].[ControlFlueTemperature] where TimeStamp between '"+ SelectDate_M + "' and '"+ calculetday_M + "' and Oven ="+SelectOven+" ", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;
                k = k - 1;

                for (j = 0; j <= k; j++)
                {
                    TimeStamp.Add(dt.Rows[j]["TimeStamp"].ToString());
                    Oven.Add(int.Parse(dt.Rows[j]["Oven"].ToString()));
                    AvgCFT_PS.Add(float.Parse(dt.Rows[j]["AvgCFT_PS"].ToString()));
                    AvgCFT_CS.Add(float.Parse(dt.Rows[j]["AvgCFT_CS"].ToString()));
                }

                return Json(new { TimeStamp, Oven, AvgCFT_PS, AvgCFT_CS }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult COKETEMP(string SelectOven, string date_1)
        {

            try
            {


                int j;
                int k;

                List<int> Totalcurrent = new List<int>();
                List<float> Current1 = new List<float>();
                List<float> Current2 = new List<float>();
                List<float> Current3 = new List<float>();
                List<float> TEMP3 = new List<float>();
                List<float> TEMP4 = new List<float>();
                List<float> TEMP5 = new List<float>();

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT *  FROM [SmartCoking_CO_JSW].[dbo].[COKETEMP] where OVEN = '" + SelectOven + "' and CONVERT(varchar, PUSHSTART ,120)like '" + "%" + date_1 + "%" + "' ", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;

                if (k > 0)
                {
                    for (j = 3; j < 103; j++)
                    {
                        //Current1.Add(float.Parse(dt.Rows[0][j].ToString()));
                        string currentValue = dt.Rows[0][j].ToString();
                        float parsedValue = 0.0f;

                        if (!string.IsNullOrEmpty(currentValue) && float.TryParse(currentValue, out parsedValue))
                        {
                            Current1.Add(parsedValue);
                        }
                        else
                        {
                            Current1.Add(0.0f); // If the value is null or cannot be parsed, add 0.
                        }

                        Date1 = dt.Rows[0][1].ToString();

                    }
                }
                if (k > 1)
                {
                    for (j = 3; j < 103; j++)
                    {
                        string currentValue2 = dt.Rows[0][j].ToString();
                        float parsedValue2 = 0.0f;

                        if (!string.IsNullOrEmpty(currentValue2) && float.TryParse(currentValue2, out parsedValue2))
                        {
                            Current2.Add(parsedValue2);
                        }
                        else
                        {
                            Current2.Add(0.0f); // If the value is null or cannot be parsed, add 0.
                        }
                        //Current2.Add(float.Parse(dt.Rows[1][j].ToString()));
                        Date2 = dt.Rows[1][1].ToString();

                    }
                }
                if (k > 2)
                {
                    for (j = 3; j < 103; j++)
                    {
                        string currentValue3 = dt.Rows[0][j].ToString();
                        float parsedValue3 = 0.0f;

                        if (!string.IsNullOrEmpty(currentValue3) && float.TryParse(currentValue3, out parsedValue3))
                        {
                            Current3.Add(parsedValue3);
                        }
                        else
                        {
                            Current3.Add(0.0f); // If the value is null or cannot be parsed, add 0.
                        }
                        //Current3.Add(float.Parse(dt.Rows[2][j].ToString()));
                        Date3 = dt.Rows[2][1].ToString();
                    }
                }
                for (int i = 1; i <= 100; i++)
                {

                    Totalcurrent.Add(i);
                }

                return Json(new { Date1, Date2, Date3, Totalcurrent, Current1, Current2, Current3 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }



        }
        public JsonResult Gas_Flow(string From_Date, string To_Date)
        {

            try
            {


                int j;
                int k;

                List<string> TIMEFIELD = new List<string>();
                List<float> MIXGASFlow_PS = new List<float>();
                List<float> MIXGASFlow_CS = new List<float>();
                List<float> CokegasFlow_PS = new List<float>();
                List<float> CokegasFlow_CS = new List<float>();
                List<float> TEMP4 = new List<float>();
                List<float> TEMP5 = new List<float>();

                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT TOP (1000) [TIMEFIELD] ,[MIXGASFlow_PS],[MIXGASFlow_CS],[CokegasFlow_PS],[CokegasFlow_CS]  FROM [SmartCoking_CO_JSW].[dbo].[CYCDATA] where TIMEFIELD between '"+From_Date+"' and '"+To_Date+"'", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;
                k = k - 1;
              
                for (j = 0; j <=k; j++)
                {
                  TIMEFIELD.Add(dt.Rows[j]["TIMEFIELD"].ToString());
                  MIXGASFlow_PS.Add(float.Parse(dt.Rows[j]["MIXGASFlow_PS"].ToString()));
                  MIXGASFlow_CS.Add(float.Parse(dt.Rows[j]["MIXGASFlow_CS"].ToString()));
                  CokegasFlow_PS.Add(float.Parse(dt.Rows[j]["CokegasFlow_PS"].ToString()));
                  CokegasFlow_CS.Add(float.Parse(dt.Rows[j]["CokegasFlow_CS"].ToString()));
                }
              
                 return Json(new { TIMEFIELD, MIXGASFlow_PS, MIXGASFlow_CS, CokegasFlow_PS, CokegasFlow_CS }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex}, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult Wgast_Gas_Flow(string From_Date, string To_Date)
        {

            try
            {


                int j;
                int k;

                List<string> TIMEFIELD = new List<string>();
                List<float> WGASTEMP1 = new List<float>();
                List<float> WGASTEMP2 = new List<float>();


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT TOP (1000) [TIMEFIELD] ,[WGASTEMP1],[WGASTEMP2] FROM [SmartCoking_CO_JSW].[dbo].[CYCDATA] where TIMEFIELD between '" + From_Date + "' and '" + To_Date + "'", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;
                k = k - 1;

                for (j = 0; j <= k; j++)
                {
                    TIMEFIELD.Add(dt.Rows[j]["TIMEFIELD"].ToString());
                    WGASTEMP1.Add(float.Parse(dt.Rows[j]["WGASTEMP1"].ToString()));
                    WGASTEMP2.Add(float.Parse(dt.Rows[j]["WGASTEMP2"].ToString()));
                }

                return Json(new { TIMEFIELD, WGASTEMP1, WGASTEMP2 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult Calorific_Value(string From_Date, string To_Date)
        {

            try
            {


                int j;
                int k;

                List<string> TIMEFIELD = new List<string>();
                List<float> CokegasCV = new List<float>();
                List<float> MixedgasCV = new List<float>();


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("SELECT TOP (1000) [TIMEFIELD] ,[CokegasCV],[MixedgasCV] FROM [SmartCoking_CO_JSW].[dbo].[CYCDATA] where TIMEFIELD between '" + From_Date + "' and '" + To_Date + "'", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;
                k = k - 1;

                for (j = 0; j <= k; j++)
                {
                    TIMEFIELD.Add(dt.Rows[j]["TIMEFIELD"].ToString());
                    CokegasCV.Add(float.Parse(dt.Rows[j]["CokegasCV"].ToString()));
                    MixedgasCV.Add(float.Parse(dt.Rows[j]["MixedgasCV"].ToString()));
                }

                return Json(new { TIMEFIELD, CokegasCV, MixedgasCV }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }

        }


        //Ber chart Section
        public JsonResult Pushings_Per_Week(string Select_Date, string Fast_AShift, string Fast_BShift, string Fast_CShift, string Secend_AShift, string Secend_BShift, string Secend_CShift, string Three_AShift, string Three_BShift, string Three_CShift, string Four_AShift, string Four_BShift, string Four_CShift, string Five_AShift, string Five_BShift, string Five_CShift, string Six_AShift, string Six_BShift, string Six_CShift, string Seven_AShift, string Seven_BShift, string Seven_CShift)
        {
            
            try
            {
                //string Fast_AShift,string Fast_BShift,string Fast_CShift, string Secend_AShift, string Secend_BShift, string Secend_CShift, string Three_AShift, string Three_BShift, string Three_CShift, string Four_AShift, string Four_BShift, string Four_CShift, string Five_AShift, string Five_BShift, string Five_CShift, string Six_AShift, string Six_BShift, string Six_CShift, string Seven_AShift, string Seven_BShift, string Seven_CShift
                /*  int Fast_AShift, Fast_BShift, Fast_CShift, Secend_AShift, Secend_BShift, Secend_CShift, Three_AShift, Three_BShift, Three_CShift, Four_AShift, Four_BShift, Four_CShift, Five_AShift, Five_BShift, Five_CShift, Six_AShift, Six_BShift, Six_CShift, Seven_AShift, Seven_BShift, Seven_CShift*/

                DateTime Select_Week = Convert.ToDateTime(Select_Date);
                string Eight_Date = Select_Week.AddDays(1).ToString("yyyy-MM-dd");//Use LAst C Shift only
                string SevenDate = Select_Week.ToString("yyyy-MM-dd");
                string SixDate = Select_Week.AddDays(-1).ToString("yyyy-MM-dd");
                string FiveDate = Select_Week.AddDays(-2).ToString("yyyy-MM-dd");
                string FourDate = Select_Week.AddDays(-3).ToString("yyyy-MM-dd");
                string ThreedDate = Select_Week.AddDays(-4).ToString("yyyy-MM-dd");
                string SecendDate = Select_Week.AddDays(-5).ToString("yyyy-MM-dd");
                string FastDate = Select_Week.AddDays(-6).ToString("yyyy-MM-dd");

                string SevenDate_D = Select_Week.ToString("dddd");
                string SixDate_D = Select_Week.AddDays(-1).ToString("dddd");
                string FiveDate_D = Select_Week.AddDays(-2).ToString("dddd");
                string FourDate_D = Select_Week.AddDays(-3).ToString("dddd");
                string ThreedDate_D = Select_Week.AddDays(-4).ToString("dddd");
                string SecendDate_D = Select_Week.AddDays(-5).ToString("dddd");
                string FastDate_D = Select_Week.AddDays(-6).ToString("dddd");


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd_F_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FastDate+' '+"06:00"+"' and '"+ FastDate+' '+"13:59"+"' ", con);
                cmd_F_A.ExecuteNonQuery();
                SqlDataReader Rs_F_A = cmd_F_A.ExecuteReader();
                if (Rs_F_A.Read())
                {
                    Fast_AShift = Convert.ToString(Rs_F_A["Count"]);
                    Rs_F_A.Close();
                }
                SqlCommand cmd_F_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FastDate + ' ' + "14:00" + "' and '" + FastDate + ' ' + "21:59" + "' ", con);
                cmd_F_B.ExecuteNonQuery();
                SqlDataReader Rs_F_B = cmd_F_B.ExecuteReader();
                if (Rs_F_B.Read())
                {
                    Fast_BShift = Convert.ToString(Rs_F_B["Count"]);
                    Rs_F_B.Close();
            
                }            
                SqlCommand cmd_F_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FastDate + ' ' + "22:00" + "' and '" + SecendDate + ' ' + "05:59" + "' ", con);
                cmd_F_C.ExecuteNonQuery();
                SqlDataReader Rs_F_C = cmd_F_C.ExecuteReader();
                if (Rs_F_C.Read())
                {
                    Fast_CShift = Convert.ToString(Rs_F_C["Count"]);
                    Rs_F_C.Close();
                 
                }

                SqlCommand cmd_S_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SecendDate + ' ' + "06:00" + "' and '" + SecendDate + ' ' + "13:59" + "' ", con);
                cmd_S_A.ExecuteNonQuery();
                SqlDataReader Rs_S_A = cmd_S_A.ExecuteReader();
                if (Rs_S_A.Read())
                {
                    Secend_AShift = Convert.ToString(Rs_S_A["Count"]);
                    Rs_S_A.Close();
                }
                SqlCommand cmd_S_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SecendDate + ' ' + "14:00" + "' and '" + SecendDate + ' ' + "21:59" + "' ", con);
                cmd_S_B.ExecuteNonQuery();
                SqlDataReader Rs_S_B = cmd_S_B.ExecuteReader();
                if (Rs_S_B.Read())
                {
                    Secend_BShift = Convert.ToString(Rs_S_B["Count"]);
                    Rs_S_B.Close();
                 
                }
                SqlCommand cmd_S_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SecendDate + ' ' + "22:00" + "' and '" + ThreedDate + ' ' + "05:59" + "' ", con);
                cmd_S_C.ExecuteNonQuery();
                SqlDataReader Rs_S_C = cmd_S_C.ExecuteReader();
                if (Rs_S_C.Read())
                {
                    Secend_CShift = Convert.ToString(Rs_S_C["Count"]);
                    Rs_S_C.Close();
                 
                }
                SqlCommand cmd_T_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + ThreedDate + ' ' + "06:00" + "' and '" + ThreedDate + ' ' + "13:59" + "' ", con);
                cmd_T_A.ExecuteNonQuery();
                SqlDataReader Rs_T_A = cmd_T_A.ExecuteReader();
                if (Rs_T_A.Read())
                {
                    Three_AShift = Convert.ToString(Rs_T_A["Count"]);
                    Rs_T_A.Close();
                }
                SqlCommand cmd_T_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + ThreedDate + ' ' + "14:00" + "' and '" + ThreedDate + ' ' + "21:59" + "' ", con);
                cmd_T_B.ExecuteNonQuery();
                SqlDataReader Rs_T_B = cmd_T_B.ExecuteReader();
                if (Rs_T_B.Read())
                {
                    Three_BShift = Convert.ToString(Rs_T_B["Count"]);
                    Rs_T_B.Close();
             
                }
                SqlCommand cmd_T_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + ThreedDate + ' ' + "22:00" + "' and '" + FourDate + ' ' + "05:59" + "' ", con);
                cmd_T_C.ExecuteNonQuery();
                SqlDataReader Rs_T_C = cmd_T_C.ExecuteReader();
                if (Rs_T_C.Read())
                {
                    Three_CShift = Convert.ToString(Rs_T_C["Count"]);
                    Rs_T_C.Close();
              
                }

                SqlCommand cmd_FO_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FourDate + ' ' + "06:00" + "' and '" + FourDate + ' ' + "13:59" + "' ", con);
                cmd_FO_A.ExecuteNonQuery();
                SqlDataReader Rs_FO_A = cmd_FO_A.ExecuteReader();
                if (Rs_FO_A.Read())
                {
                    Four_AShift = Convert.ToString(Rs_FO_A["Count"]);
                    Rs_FO_A.Close();
                }
                SqlCommand cmd_FO_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FourDate + ' ' + "14:00" + "' and '" + FourDate + ' ' + "21:59" + "' ", con);
                cmd_FO_B.ExecuteNonQuery();
                SqlDataReader Rs_FO_B = cmd_FO_B.ExecuteReader();
                if (Rs_FO_B.Read())
                {
                    Four_BShift = Convert.ToString(Rs_FO_B["Count"]);
                    Rs_FO_B.Close();
                 
                }
                SqlCommand cmd_FO_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FourDate + ' ' + "22:00" + "' and '" + FiveDate + ' ' + "05:59" + "' ", con);
                cmd_FO_C.ExecuteNonQuery();
                SqlDataReader Rs_FO_C = cmd_FO_C.ExecuteReader();
                if (Rs_FO_C.Read())
                {
                    Four_CShift = Convert.ToString(Rs_FO_C["Count"]);
                    Rs_FO_C.Close();
                   
                }
                //five
                SqlCommand cmd_FI_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FiveDate + ' ' + "06:00" + "' and '" + FiveDate + ' ' + "13:59" + "' ", con);
                cmd_FI_A.ExecuteNonQuery();
                SqlDataReader Rs_FI_A = cmd_FI_A.ExecuteReader();
                if (Rs_FI_A.Read())
                {
                    Five_AShift = Convert.ToString(Rs_FI_A["Count"]);
                    Rs_FI_A.Close();
                }
                SqlCommand cmd_FI_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FiveDate + ' ' + "14:00" + "' and '" + FiveDate + ' ' + "21:59" + "' ", con);
                cmd_FI_B.ExecuteNonQuery();
                SqlDataReader Rs_FI_B = cmd_FI_B.ExecuteReader();
                if (Rs_FI_B.Read())
                {
                    Five_BShift = Convert.ToString(Rs_FI_B["Count"]);
                    Rs_FI_B.Close();
               
                }
                SqlCommand cmd_FI_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FiveDate + ' ' + "22:00" + "' and '" + SixDate + ' ' + "05:59" + "' ", con);
                cmd_FI_C.ExecuteNonQuery();
                SqlDataReader Rs_FI_C = cmd_FI_C.ExecuteReader();
                if (Rs_FI_C.Read())
                {
                    Five_CShift = Convert.ToString(Rs_FI_C["Count"]);
                    Rs_FI_C.Close();
                 
                }
                SqlCommand cmd_SI_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SixDate + ' ' + "06:00" + "' and '" + SixDate + ' ' + "13:59" + "' ", con);
                cmd_SI_A.ExecuteNonQuery();
                SqlDataReader Rs_SI_A = cmd_SI_A.ExecuteReader();
                if (Rs_SI_A.Read())
                {
                    Six_AShift = Convert.ToString(Rs_SI_A["Count"]);
                    Rs_SI_A.Close();
                }
                SqlCommand cmd_SI_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SixDate + ' ' + "14:00" + "' and '" + SixDate + ' ' + "21:59" + "' ", con);
                cmd_SI_B.ExecuteNonQuery();
                SqlDataReader Rs_SI_B = cmd_SI_B.ExecuteReader();
                if (Rs_SI_B.Read())
                {
                    Six_BShift = Convert.ToString(Rs_SI_B["Count"]);
                    Rs_SI_B.Close();
               
                }
                SqlCommand cmd_SI_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SixDate + ' ' + "22:00" + "' and '" + SevenDate + ' ' + "05:59" + "' ", con);
                cmd_SI_C.ExecuteNonQuery();
                SqlDataReader Rs_SI_C = cmd_SI_C.ExecuteReader();
                if (Rs_SI_C.Read())
                {
                    Six_CShift = Convert.ToString(Rs_SI_C["Count"]);
                    Rs_SI_C.Close();
           
                }

                SqlCommand cmd_Sv_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SevenDate + ' ' + "06:00" + "' and '" + SevenDate + ' ' + "13:59" + "' ", con);
                cmd_Sv_A.ExecuteNonQuery();
                SqlDataReader Rs_Sv_A = cmd_Sv_A.ExecuteReader();
                if (Rs_Sv_A.Read())
                {
                    Seven_AShift = Convert.ToString(Rs_Sv_A["Count"]);
                    Rs_Sv_A.Close();
                }
                SqlCommand cmd_Sv_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SevenDate + ' ' + "14:00" + "' and '" + SevenDate + ' ' + "21:59" + "' ", con);
                cmd_Sv_B.ExecuteNonQuery();
                SqlDataReader Rs_Sv_B = cmd_Sv_B.ExecuteReader();
                if (Rs_Sv_B.Read())
                {
                    Seven_BShift = Convert.ToString(Rs_Sv_B["Count"]);
                    Rs_Sv_B.Close();
                   
                }
                SqlCommand cmd_Sv_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SevenDate + ' ' + "22:00" + "' and '" + Eight_Date + ' ' + "05:59" + "' ", con);
                cmd_Sv_C.ExecuteNonQuery();
                SqlDataReader Rs_Sv_C = cmd_Sv_C.ExecuteReader();
                if (Rs_Sv_C.Read())
                {
                    Seven_CShift = Convert.ToString(Rs_Sv_C["Count"]);
                    Rs_Sv_C.Close();
                  
                }
                con.Close();
                string AShift ="";
                string BShift = "";
                string CShift = "";
                string Days = "";
                AShift = "[" + Fast_AShift + "," + Secend_AShift + "," + Three_AShift + "," + Four_AShift + "," + Five_AShift + "," + Six_AShift + "," + Seven_AShift + "]";
                BShift = "[" + Fast_BShift + "," + Secend_BShift + "," + Three_BShift + "," + Four_BShift + "," + Five_BShift + "," + Six_BShift + "," + Seven_BShift + "]";
                CShift = "[" + Fast_CShift + "," + Secend_CShift + "," + Three_CShift + "," + Four_CShift + "," + Five_CShift + "," + Six_CShift + "," + Seven_CShift + "]";
                Days = "['" + FastDate_D + "','" + SecendDate_D + "','" + ThreedDate_D + "','" + FastDate_D + "','" + FiveDate_D+ "','" + SixDate_D + "','" + SevenDate_D + "']";

                return Json(new { AShift, BShift, CShift,Days }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Pushings_Per_Month(string Select_Month)
        {
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                int i;
                string i_M = null;
                DateTime Select_Month_1st_D = Convert.ToDateTime(Select_Month);
                DateTime Select_Month_Last_D = Select_Month_1st_D.AddMonths(1).AddDays(-1);
                string CountDate = "";
                List<int> TotaPusing = new List<int>();

                for (i = 1; i < Select_Month_Last_D.Day + 1; i++)
                {
                    if (i < 10)
                    {
                        i_M = "0" + i;

                    }
                    else
                    {
                        i_M = Convert.ToString(i);
                    }

                    SqlCommand cmd = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Select_Month + "-" + i_M + "%" + "' ", con);
                    cmd.ExecuteNonQuery();
                    SqlDataReader Rs = cmd.ExecuteReader();
                    Rs.Read();

                    int value = Convert.ToInt16(Rs["Count"]);
                    TotaPusing.Add(value);

                    Rs.Close();

                    CountDate += "'" + i_M + "',";

                }
                CountDate = CountDate.Substring(0, Math.Max(0, CountDate.Length - 1));
               

                return Json(new { TotaPusing, CountDate }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex) 
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
            
        }
        public JsonResult Ave_cokr_Temp(string From_Date)
        {

            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();
            DateTime FromDate = Convert.ToDateTime(From_Date);
            string AShiftStart = FromDate.ToString("yyyy-MM-dd 06:00");
            string CShiftEnd = FromDate.AddDays(1).ToString("yyyy-MM-dd 05:59");

            SqlCommand cmd0 = new SqlCommand("SELECT  OVEN,AVG FROM  [SmartCoking_CO_JSW].[dbo].[COKETEMP] WHERE  PUSHSTART  between '" + AShiftStart + "' and '" + CShiftEnd + "' ", con);
            DataTable dt = new DataTable();
            SqlDataAdapter Dta = new SqlDataAdapter(cmd0);
            Dta.Fill(dt);
            string html = "";
            if (dt.Rows.Count > 0)
            {
                int i;
                for (i = 0; i < dt.Rows.Count; i++)
                {
                    html += "['" + dt.Rows[i]["OVEN"] + "'," + dt.Rows[i]["AVG"] + "],";
                }
            }
            html = html.Substring(0, Math.Max(0, html.Length - 1));
            con.Close();
            return Json(new { html }, JsonRequestBehavior.AllowGet);



        }
        public JsonResult Pushing_Per_Year(string Year)
        {
            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();
            int i;
            int January =0, February=0, March = 0, April = 0, Maya = 0, June = 0, July = 0, August = 0, September = 0, October = 0, November = 0, December =0;
            string[] Months = { "January", "February", "March","April","Maya","June","July","August", "September","October","November","December" };

            string Jan_Day = "";
            string Feb_Day = ""; string Mar_Day = ""; string Apr_Day = ""; string May_Day = ""; string Jun_Day = ""; string Jul_Day = ""; string Aug_Day = ""; string Sep_Day = ""; string Oct_Day = ""; string Nov_Day = ""; string Dec_Day = "";


            for (i = 1; i < 13 ; i++)
            {
                string M;
                if (i < 10)
                {
                    M = "0" + i;

                }
                else
                {
                    M = Convert.ToString(i);
                }
                SqlCommand cmd = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year +"-"+M+"%" + "' ", con);
                cmd.ExecuteNonQuery();
                SqlDataReader Rs = cmd.ExecuteReader();
               
               
                if (M == "01")
                {
                    Rs.Read();
                    January = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int ja;
                    for (ja = 1; ja <= 31; ja++)
                    {
                        string Jan;if (ja< 10) { Jan = "0" + ja; } else { Jan = Convert.ToString(ja); }
                        SqlCommand cmd1 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-01-" + Jan + "%" + "' ", con);
                        cmd1.ExecuteNonQuery();
                        SqlDataReader Rs1 = cmd1.ExecuteReader();
                        Rs1.Read();
                        int Jan_Value= Convert.ToInt16(Rs1["Count"]);   
                        Jan_Day += "['" +Jan+ "',"+ Jan_Value + "],";
                        Rs1.Close();

                    }
                    Jan_Day = Jan_Day.Substring(0, Math.Max(0, Jan_Day.Length - 1));

                }
                else if (M == "02")
                {
                    Rs.Read();
                    February = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
               
                    string Feddare = Year + "-02-01";
                    DateTime lepier = Convert.ToDateTime(Feddare).AddMonths(1).AddDays(-1);


                    int Fe;
                    for (Fe = 1; Fe <= lepier.Day; Fe++)
                    {
                        string Feb; if (Fe < 10) { Feb = "0" + Fe; } else { Feb = Convert.ToString(Fe); }
                        SqlCommand cmd2 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" +Year+"-"+lepier.Day+"-"+Feb+"%" + "' ", con);
                        cmd2.ExecuteNonQuery();
                        SqlDataReader Rs2 = cmd2.ExecuteReader();
                        Rs2.Read();
                        int Feb_Value = Convert.ToInt16(Rs2["Count"]);
                        Feb_Day += "['" + Feb + "'," + Feb_Value + "],";
                        Rs2.Close();

                    }
                    Feb_Day = Feb_Day.Substring(0, Math.Max(0, Feb_Day.Length - 1));

                }
                else if (M == "03")
                {
                    Rs.Read();
                    March = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Mar;
                    for (Mar = 1; Mar <= 31; Mar++)
                    {
                        string Marc; 
                        if (Mar < 10) 
                        { 
                            Marc = "0" + Mar; 
                        } 
                        else 
                        {
                            Marc = Convert.ToString(Mar);
                        }
                        SqlCommand cmd3 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-03-" + Marc + "%" + "' ", con);
                        cmd3.ExecuteNonQuery();
                        SqlDataReader Rs3 = cmd3.ExecuteReader();
                        Rs3.Read();
                        int Mar_Value = Convert.ToInt16(Rs3["Count"]);
                        Mar_Day += "['" + Marc + "'," + Mar_Value + "],";
                        Rs3.Close();

                    }
                    Mar_Day = Mar_Day.Substring(0, Math.Max(0, Mar_Day.Length - 1));


                } 
                else if (M == "04")
                {
                    Rs.Read();
                    April = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Apr;
                    for (Apr = 1; Apr <= 30; Apr++)
                    {
                        string Apri;
                        if (Apr < 10)
                        {
                            Apri = "0" + Apr;
                        }
                        else
                        {
                            Apri = Convert.ToString(Apr);
                        }
                        SqlCommand cmd4 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-04-" + Apri + "%" + "' ", con);
                        cmd4.ExecuteNonQuery();
                        SqlDataReader Rs4 = cmd4.ExecuteReader();
                        Rs4.Read();
                        int Apri_Value = Convert.ToInt16(Rs4["Count"]);
                        Apr_Day += "['" + Apri + "'," + Apri_Value + "],";
                        Rs4.Close();

                    }
                    Apr_Day = Apr_Day.Substring(0, Math.Max(0, Apr_Day.Length - 1));
                }
                else if (M == "05") 
                {
                    Rs.Read();
                    Maya = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int May;
                    for (May = 1; May <= 31; May++)
                    {
                        string Maye;
                        if (May < 10)
                        {
                            Maye = "0" + May;
                        }
                        else
                        {
                            Maye = Convert.ToString(May);
                        }
                        SqlCommand cmd5 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-05-" + Maye + "%" + "' ", con);
                        cmd5.ExecuteNonQuery();
                        SqlDataReader Rs5 = cmd5.ExecuteReader();
                        Rs5.Read();
                        int Maya_Value = Convert.ToInt16(Rs5["Count"]);
                        May_Day += "['" + Maye + "'," + Maya_Value + "],";
                        Rs5.Close();

                    }
                    May_Day = May_Day.Substring(0, Math.Max(0, May_Day.Length - 1));
                }
                else if (M == "06") 
                {
                    Rs.Read();
                    June = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Ju;
                    for (Ju = 1; Ju <= 30; Ju++)
                    {
                        string Jun;
                        if (Ju < 10)
                        {
                            Jun = "0" + Ju;
                        }
                        else
                        {
                            Jun = Convert.ToString(Ju);
                        }
                        SqlCommand cmd6 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-06-" + Jun + "%" + "' ", con);
                        cmd6.ExecuteNonQuery();
                        SqlDataReader Rs6 = cmd6.ExecuteReader();
                        Rs6.Read();
                        int Jun_Value = Convert.ToInt16(Rs6["Count"]);
                        Jun_Day += "['" + Jun + "'," + Jun_Value + "],";
                        Rs6.Close();

                    }
                    Jun_Day = Jun_Day.Substring(0, Math.Max(0, Jun_Day.Length - 1));

                }
                else if (M == "07") 
                {
                    Rs.Read();
                    July = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Jul;
                    for (Jul = 1; Jul <= 31; Jul++)
                    {
                        string Jull;
                        if (Jul < 10)
                        {
                            Jull = "0" + Jul;
                        }
                        else
                        {
                            Jull = Convert.ToString(Jul);
                        }
                        SqlCommand cmd7 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-07-" + Jull + "%" + "' ", con);
                        cmd7.ExecuteNonQuery();
                        SqlDataReader Rs7 = cmd7.ExecuteReader();
                        Rs7.Read();
                        int Jul_Value = Convert.ToInt16(Rs7["Count"]);
                        Jul_Day += "['" + Jull + "'," + Jul_Value + "],";
                        Rs7.Close();

                    }
                    Jul_Day = Jul_Day.Substring(0, Math.Max(0, Jul_Day.Length - 1));

                }
                else if (M == "08") 
                {
                    Rs.Read();
                    August = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Aug;
                    for (Aug = 1; Aug <= 31; Aug++)
                    {
                        string Augu;
                        if (Aug < 10)
                        {
                            Augu = "0" + Aug;
                        }
                        else
                        {
                            Augu = Convert.ToString(Aug);
                        }
                        SqlCommand cmd8 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-08-" + Augu + "%" + "' ", con);
                        cmd8.ExecuteNonQuery();
                        SqlDataReader Rs8 = cmd8.ExecuteReader();
                        Rs8.Read();
                        int Aug_Value = Convert.ToInt16(Rs8["Count"]);
                        Aug_Day += "['" + Augu + "'," + Aug_Value + "],";
                        Rs8.Close();

                    }
                    Aug_Day = Aug_Day.Substring(0, Math.Max(0, Aug_Day.Length - 1));

                }
                else if (M == "09") 
                {
                    Rs.Read();
                    September = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Sept;
                    for (Sept = 1; Sept <= 30; Sept++)
                    {
                        string Septe;
                        if (Sept < 10)
                        {
                            Septe = "0" + Sept;
                        }
                        else
                        {
                            Septe = Convert.ToString(Sept);
                        }
                        SqlCommand cmd9 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-09-" + Septe + "%" + "' ", con);
                        cmd9.ExecuteNonQuery();
                        SqlDataReader Rs9 = cmd9.ExecuteReader();
                        Rs9.Read();
                        int Sep_Value = Convert.ToInt16(Rs9["Count"]);
                        Sep_Day += "['" + Septe + "'," + Sep_Value + "],";
                        Rs9.Close();

                    }
                    Sep_Day = Sep_Day.Substring(0, Math.Max(0, Sep_Day.Length - 1));
                } 
                else if (M == "10") 
                {
                    Rs.Read();
                    October = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Oct;
                    for (Oct = 1; Oct <= 31; Oct++)
                    {
                        string Octo;
                        if (Oct < 10)
                        {
                            Octo = "0" + Oct;
                        }
                        else
                        {
                            Octo = Convert.ToString(Oct);
                        }
                        SqlCommand cmd10 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-10-" + Octo + "%" + "' ", con);
                        cmd10.ExecuteNonQuery();
                        SqlDataReader Rs10 = cmd10.ExecuteReader();
                        Rs10.Read();
                        int Oct_Value = Convert.ToInt16(Rs10["Count"]);
                        Oct_Day += "['" + Octo + "'," + Oct_Value + "],";
                        Rs10.Close();

                    }
                    Oct_Day = Oct_Day.Substring(0, Math.Max(0, Oct_Day.Length - 1));
                } 
                else if (M == "11") 
                {
                    Rs.Read();
                    November = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Nov;
                    for (Nov = 1; Nov <= 30; Nov++)
                    {
                        string Nove;
                        if (Nov < 10)
                        {
                            Nove = "0" + Nov;
                        }
                        else
                        {
                            Nove = Convert.ToString(Nov);
                        }
                        SqlCommand cmd11 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-11-" + Nove + "%" + "' ", con);
                        cmd11.ExecuteNonQuery();
                        SqlDataReader Rs11 = cmd11.ExecuteReader();
                        Rs11.Read();
                        int Nov_Value = Convert.ToInt16(Rs11["Count"]);
                        Nov_Day += "['" + Nove + "'," + Nov_Value + "],";
                        Rs11.Close();

                    }
                    Nov_Day = Nov_Day.Substring(0, Math.Max(0, Nov_Day.Length - 1));
                } 
                else  
                {
                    Rs.Read();
                    December = Convert.ToInt16(Rs["Count"]);
                    Rs.Close();
                    int Dec;
                    for (Dec = 1; Dec <= 31; Dec++)
                    {
                        string Dece;
                        if (Dec < 10)
                        {
                            Dece = "0" + Dec;
                        }
                        else
                        {
                            Dece = Convert.ToString(Dec);
                        }
                        SqlCommand cmd12 = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where  CONVERT(varchar, PUSHEDTIME ,120)like '" + "%" + Year + "-12-" + Dece + "%" + "' ", con);
                        cmd12.ExecuteNonQuery();
                        SqlDataReader Rs12 = cmd12.ExecuteReader();
                        Rs12.Read();
                        int Dec_Value = Convert.ToInt16(Rs12["Count"]);
                        Dec_Day += "['" + Dece + "'," + Dec_Value + "],";
                        Rs12.Close();

                    }
                    Dec_Day = Dec_Day.Substring(0, Math.Max(0, Dec_Day.Length - 1));
                }

               

            }



           

            return Json(new { January, February, March, April, Maya, June, July, August, September, October, November, December,Jan_Day,Feb_Day,Mar_Day,Apr_Day,May_Day,Jun_Day,Jul_Day,Aug_Day,Sep_Day,Oct_Day,Nov_Day,Dec_Day }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Control_Flue_Temp_Bar(string From_Date)
        {
            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();

          
            SqlCommand cmd0 = new SqlCommand("SELECT * FROM [SmartCoking_CO_JSW].[dbo].[ControlFlueTemperature] where CONVERT(varchar, TimeStamp ,120)like'" + "%" + From_Date + "%" + "' ", con);
            DataTable dt = new DataTable();
            SqlDataAdapter Dta = new SqlDataAdapter(cmd0);
            Dta.Fill(dt);
            string html = "";
            if (dt.Rows.Count > 0)
            {
                int i;
                for (i = 0; i < dt.Rows.Count; i++)
                {
                    html += "['" + dt.Rows[i]["Oven"] + "'," + dt.Rows[i]["AvgCFT"] + "],";
                }
            }
            html = html.Substring(0, Math.Max(0, html.Length - 1));
            con.Close();
            return Json(new { html }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Mosisturiser_Amount(string From_Date)
        {
            try
            {


                DateTime SelectDate = Convert.ToDateTime(From_Date);
                string SelectDate_M = SelectDate.ToString("yyyy-MM-dd 00:01");

                

                int j;
                int k;

                List<string> PUSHEDTIME = new List<string>();
                List<string> Oven = new List<string>();

                List<float> AMOUNT = new List<float>();
                List<float> MOISTURE = new List<float>();


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand("select * FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where CONVERT(varchar, TIMEFIELD ,120)like'" + "%" + From_Date + "%" + "' ", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;
                k = k - 1;

                for (j = 0; j <= k; j++)
                {
                    PUSHEDTIME.Add(dt.Rows[j]["TIMEFIELD"].ToString());
                    Oven.Add((dt.Rows[j]["OVEN"].ToString()));
                    AMOUNT.Add(float.Parse(dt.Rows[j]["AMOUNT"].ToString()));
                    MOISTURE.Add(float.Parse(dt.Rows[j]["MOISTURE"].ToString()));
                }

                return Json(new { PUSHEDTIME, Oven, AMOUNT, MOISTURE }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Alerts()
        {
            return View();  
        }



    }






}