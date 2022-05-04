import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import profilepic from "../media/profile-pic.png";
import divider from "../media/line.png";
import "../css/Profile.css";

function ProfileValues() {
  const [profile, setProfile] = useState([]);
  const username = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.email);

  useEffect(() => {
    async function fetchProfile() {
      const response = await axios.get(
        `http://localhost:5000/api/order/${username}`
      );
      setProfile(response.data);
    }
    fetchProfile();
  }, [username]);

  const TotalOrderValue = profile.reduce(function (x, y) {
    return x + y.total;
  }, 0);

  return (
    <div className="orderhistorik">
      <img src={profilepic} alt="" className="profile-pic"></img>
      <h1>{username}</h1>
      <p className="email-profile">{email}</p>
      <h2 className="order-header">Orderhistorik</h2>
      {profile &&
        profile.map((profile, index) => {
          return (
            <div key={index}>
              <div className="orderhistorik-case">
                <div className="order-inside">
                  <p>#{profile.id}</p>
                  <p className="ordertime">{profile.eta}</p>
                </div>
                <div className="order-inside">
                  <p>Total ordersumma:</p>
                  <p>{profile.total}kr</p>
                </div>
              </div>
              <img src={divider} alt=""></img>
            </div>
          );
        })}

      <div className="totalt-spenderat">
        <p>Totalt spenderat</p> <p>{TotalOrderValue} kr</p>
      </div>
    </div>
  );
}

export default ProfileValues;
