import React, { useContext, useState, useEffect } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import user from "../../assets/images/user.jpg";
import "./Update.scss";
export const Update = () => {
  const [data, setData] = useState({
    username: "",
    newEmail: "",
    oldPassword: "",
  });
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (img) {
      const storageRef = ref(storage, "usersImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              photoURL: downloadURL,
              displayName: data.username,
            });

            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.oldPassword
            );

            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                // User re-authenticated.
                await updateEmail(currentUser, data.newEmail);
              }
            );
          });
        }
      );
    } else {
      await updateProfile(currentUser, {
        displayName: data.username,
      });
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.oldPassword
      );

      await reauthenticateWithCredential(currentUser, credential).then(
        async () => {
          // User re-authenticated.
          await updateEmail(currentUser, data.newEmail);
        }
      );
    }

    navigate("/user");
  };
  // console.log(data);

  return (
    <div className="update">
      <div className="updateWrapper">
        <h3 className="updateTitle">Edit Your Account</h3>
        <span>Email Address: {currentUser.email}</span>

        <div className="updateContainer">
          <form onSubmit={handleUpdate}>
            <div className="formItem">
              <span>Profile Photo</span>
              <div className="profilePic">
                <img
                  src={img ? URL.createObjectURL(img) : currentUser.photoURL || user}
                  alt="img"
                  className="profileImg"
                />

                <label htmlFor="file">
                  <span className="change">Change</span>
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
            </div>
            <div className="formItem">
              <label>Username</label>
              <input
                className="formInput"
                type="text"
                name="username"
                placeholder={currentUser.displayName}
                value={data.username}
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label>Email</label>
              <input
                className="formInput"
                type="email"
                name="newEmail"
                placeholder={currentUser.email}
                value={data.newEmail}
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label>Password</label>
              <input
                className="formInput"
                name="oldPassword"
                type="password"
                value={data.oldPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="updateButton">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};






