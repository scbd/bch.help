Imports System.Net
Imports System.IO

Partial Class ic_community

    Inherits System.Web.UI.Page

    Private Const OutputSessionInfo As Boolean = False

    Private Const targetURL As String = "<!--DXMETADATA start type="communityproxytargeturl" --><!--DXMETADATA end -->ic_community.aspx"

    ' This is the proxy
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        ' Make sure that a session Id is assigned
        If Session("dummy") Is Nothing Then
            Session("dummy") = "1"
        End If

        Response.ContentType = "text/xml"
        Response.Expires = 0
        Response.Cache.SetCacheability(HttpCacheability.NoCache)

        Trace.Write("Info", "Session Id: " & Session.SessionID)
        Trace.Write("Info", "Absolute Path: " & Request.Url.AbsoluteUri)

        ' A callback from the login process to provide the login credentials
        If Request("setaspxauth") IsNot Nothing Then
            Trace.Write("Action", "Setting PROXY_ASPXAUTH for Session Id " & Request("proxysessionid") & " to: " & Request("setaspxauth"))
            Cache.Insert("PROXY_ASPXAUTH_" & Request("proxysessionid"), Request("setaspxauth"), Nothing, DateTime.MaxValue, TimeSpan.FromMinutes(30), CacheItemPriority.NotRemovable, Nothing)
            If Request("returnurl") <> String.Empty Then
                Response.Redirect(Request("returnurl"))
            Else
                Response.End()
            End If
        Else

            ' Get the request content
            Dim Reader As New StreamReader(Page.Request.InputStream)
            Dim RequestContent() As Byte = System.Text.UTF8Encoding.UTF8.GetBytes(Reader.ReadToEnd())

            ' Create the request object
            Dim ProxyWebRequest As HttpWebRequest = WebRequest.Create(targetURL & "?fromproxy=1&proxyurl=" & HttpUtility.UrlEncode(Request.Url.AbsoluteUri.Substring(0, Request.Url.AbsoluteUri.IndexOf("?"))) & "&proxysessionid=" & Session.SessionID & "&" & Request.QueryString.ToString)
            ProxyWebRequest.Method = "POST"
            ProxyWebRequest.ContentType = Request.ContentType
            ProxyWebRequest.ContentLength = RequestContent.Length
            ProxyWebRequest.CachePolicy = New System.Net.Cache.RequestCachePolicy(Net.Cache.RequestCacheLevel.NoCacheNoStore)
            ProxyWebRequest.UserAgent = Request.UserAgent

            ' Container for any issued cookies
            Dim cookies As New CookieContainer

            ' Look in the cache for existing .ASPXAUTH we may already have
            If Cache.Get("PROXY_ASPXAUTH_" & Session.SessionID) IsNot Nothing Then
                Trace.Write("Action", "Found PROXY_ASPXAUTH: " & Cache.Get("PROXY_ASPXAUTH_" & Session.SessionID) & ". Adding as cookie for authentication")
                ProxyWebRequest.Headers.Add("Cookie", ".ASPXAUTH=" & Cache.Get("PROXY_ASPXAUTH_" & Session.SessionID))
            Else
                Trace.Write("Info", "No PROXY_ASPXAUTH found in the cache")
                ProxyWebRequest.CookieContainer = cookies
            End If

            ' Write the original request content
            Dim ProxyWebRequestStream As Stream = ProxyWebRequest.GetRequestStream()
            ProxyWebRequestStream.Write(RequestContent, 0, RequestContent.Length)

            Dim ProxyWebResponse As HttpWebResponse = ProxyWebRequest.GetResponse()
            Dim ProxyWebResponseStream As Stream = ProxyWebResponse.GetResponseStream()
            Dim ProxyWebResponseStreamReader As New StreamReader(ProxyWebResponseStream)

            ' Output the contents of the Community Extensions response byte for byte
            Response.Write(ProxyWebResponseStreamReader.ReadToEnd)
            Response.End()

        End If

    End Sub
End Class
