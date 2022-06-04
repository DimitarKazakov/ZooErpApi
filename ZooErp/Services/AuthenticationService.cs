using System;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;
using PuWeb.Models;
using RestSharp;

namespace ZooErp.Services
{
	public class AuthenticationService
	{
        private const string UrlEncoded = "application/x-www-form-urlencoded";
        private readonly IConfiguration configuration;

        public AuthenticationService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<KeycloakResponse> AuthenticateAsync(LogInRequest request)
        {
            var client = new RestClient($"{this.configuration["Keycloak:Authority"]}/protocol/openid-connect/token");
            var authRequest = new RestRequest
            {
                Method = Method.Post
            };
            authRequest.AddHeader("Content-Type", UrlEncoded);
            authRequest.AddParameter("username", request.Username);
            authRequest.AddParameter("password", request.Password);
            authRequest.AddParameter("grant_type", "password");
            authRequest.AddParameter("client_id", this.configuration["Keycloak:Audience"]);
            authRequest.AddParameter("client_secret", this.configuration["Keycloak:Secret"]);
            var response = await client.ExecuteAsync(authRequest);
            var result = JsonConvert.DeserializeObject<KeycloakResponse>(response.Content);

            return result;
        }

        public async Task<UserInfoResponse> GetUserInfoAsync(string accessToken)
        {
            if (!accessToken.Contains("Bearer"))
            {
                accessToken = $"Bearer {accessToken}";
            }

            var client = new RestClient($"{this.configuration["Keycloak:Authority"]}/protocol/openid-connect/userinfo");

            var infoRequest = new RestRequest
            {
                Method = Method.Get
            };
            infoRequest.AddHeader("Authorization", accessToken);
            var response = await client.ExecuteAsync(infoRequest);
            var result = JsonConvert.DeserializeObject<UserInfoResponse>(response.Content);
            return result;
        }
    }
}

