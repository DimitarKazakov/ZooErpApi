using System;
using Newtonsoft.Json;

namespace PuWeb.Models
{
    public class UserInfoResponse
    {
        [JsonProperty("sub")]
        public string Id { get; set; }

        [JsonProperty("email_verified")]
        public bool Verified { get; set; }

        [JsonProperty("user_realm_roles")]
        public IEnumerable<string> RealmRoles { get; set; }

        [JsonProperty("user_roles")]
        public IEnumerable<string> Roles { get; set; }

        [JsonProperty("name")]
        public string FullName { get; set; }

        [JsonProperty("preferred_username")]
        public string Username { get; set; }

        [JsonProperty("given_name")]
        public string FirstName { get; set; }

        [JsonProperty("family_name")]
        public string LastName { get; set; }

        [JsonProperty("error")]
        public string Error { get; set; }

        [JsonProperty("error_description")]
        public string ErrorDescription { get; set; }
    }

}

