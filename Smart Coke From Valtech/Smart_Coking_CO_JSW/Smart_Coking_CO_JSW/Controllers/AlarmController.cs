using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;

namespace Smart_Coking_CO_JSW.Controllers
{
    public class AlarmController : Controller
    {
        // GET: Alarm/About
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult About()
        {
            // Load the XML file into an XDocument
            XDocument doc = XDocument.Load("C:\\Users\\nabin\\OneDrive\\Desktop\\test.xml");

            // Query the XML to retrieve data
            var books = from book in doc.Descendants("book")
                        select new
                        {
                            Author = book.Element("author").Value,
                            Title = book.Element("title").Value,
                            Genre = book.Element("genre").Value,
                            Price = Convert.ToDecimal(book.Element("price").Value),
                            PublishDate = DateTime.Parse(book.Element("publish_date").Value),
                            Description = book.Element("description").Value
                        };
            String html = "";
            // Iterate through the retrieved data
        
            foreach (var book in books)
            {
               var a =(book.Author);

               var b=(book.Title);
               var c=(book.Genre);
               var d =(book.Price); // Format as currency
               DateTime e = (book.PublishDate);
               var f=(book.Description);

                html += "['" + a + "','" + b + "','" + c + "','" + d + "','" + e.ToString("yyyy-MM-dd HH:mm:ss") + "','" + f + "','" +"'],";
            }
            html = html.Substring(0, Math.Max(0, html.Length - 1));
            return Json(new {html}, JsonRequestBehavior.AllowGet);
        }
    }
}