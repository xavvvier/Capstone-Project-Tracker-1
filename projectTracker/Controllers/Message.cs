using System;
namespace projectTracker.Controllers
{
    public class Message
    {
        public String Title { get; set; }
        public String Content { get; set; }
        public Boolean Valid { get; set; }



        public static Message Ok(String Title, String Content)
        {
            return new Message
            {
                Valid = true,
                Title = Title,
                Content = Content
            };
        }

        public static Message Error(String Content)
        {
            return new Message
            {
                Valid = false,
                Title = "Error",
                Content = Content
            };
        }
    }
}
