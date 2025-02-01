import React from 'react';
import "./../styles/MainPage.css";
import user_image from "./../assets/user_image.png";

function MainPage() {
  return (
    <div className="main-page">
      <div className="top">
        <img src={user_image} alt="user image" className="user-logo"/>
        
        <div className="user-info">
          <p>Company Name : XYZ</p>
          <p>Company Address : XYZ city</p>
          <p>Company Email : xyz@vscode.com</p>
        </div>
      </div>

      <div className="bottom">
        <p>My Websites</p>
        <ul>
          <li>My Website url</li>
          <li>My Website url</li>
          <li>My Website url</li>
          <li>My Website url</li>
          <li>My Website url</li>
        </ul>
      </div>
    </div>
  )
}

export default MainPage