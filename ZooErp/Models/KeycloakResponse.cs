using System;
using Newtonsoft.Json;

namespace PuWeb.Models
{
    public class KeycloakResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("expires_in")]
        public int? ExpiresIn { get; set; }

        [JsonProperty("refresh_expires_in")]
        public int? RefreshExpiresIn { get; set; }

        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }

        [JsonProperty("scope")]
        public string Scope { get; set; }

        [JsonProperty("session_state")]
        public string SessionState { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonProperty("error")]
        public string Error { get; set; }

        [JsonProperty("error_description")]
        public string ErrorDescription { get; set; }
    }

}

