/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Cloud1, Cloud2, Cloud3, User } from "../assets";
import { BlueButton, Icons } from "../components";
import axios from "axios";
import { toast } from "sonner";

const socialMediaIcons = [
  { name: "Discord", icon: "ant-design:discord-outlined" },
  { name: "Twitter", icon: "mdi:twitter" },
  { name: "Facebook", icon: "mdi:facebook" },
  { name: "Instagram", icon: "mdi:instagram" },
  { name: "Telegram", icon: "mdi:telegram" },
  { name: "YouTube", icon: "mdi:youtube" },
];

const Profile = () => {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [avatar, setAvatar] = useState(User);
  const [handles, setHandles] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    description: "",
    website: "",
    about: "",
    avatar: "",
    Discord: "",
    Twitter: "",
    Instagram: "",
    Telegram: "",
    YouTube: "",
    Facebook: "",
  });
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [availableIcons, setAvailableIcons] = useState(socialMediaIcons);
  const [selectedIcons, setSelectedIcons] = useState([
    { name: "Discord", icon: "ant-design:discord-outlined" },
  ]);
  const maxLength = 500;

  const BASE_URL = "https://server-production-411c.up.railway.app";
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextChange = (event) => {
    setText(event.target.value.slice(0, maxLength));
    setFormData({ ...formData, about: event.target.value.slice(0, maxLength) });
  };

  const handleTextChange2 = (event) => {
    setText2(event.target.value.slice(0, maxLength));
    setFormData({
      ...formData,
      description: event.target.value.slice(0, maxLength),
    });
  };

  const handleSelectIcon = (icon) => {
    setSelectedIcons((prev) => [...prev, { ...icon, url: "" }]);
    setAvailableIcons((prev) => prev.filter((item) => item.name !== icon.name));
  };

  const handleInputChange = (name, value) => {
    setSelectedIcons((prev) =>
      prev.map((item) => (item.name === name ? { ...item, url: value } : item))
    );
    console.log(selectedIcons);
  };

  const handleAddContact = (icon) => {
    if (!icon.url) return alert("Please enter a valid URL");
    setHandles((prev) => [...prev, icon]);
    setFormData((prev) => ({
      ...prev,
      [icon.name]: icon.url,
    }));
    setSelectedIcons((prev) => prev.filter((item) => item.name !== icon.name));
  };
  useEffect(() => {}, [handles]);

  const getAuthToken = () => {
    return sessionStorage.getItem("ddhcnvK2");
  };
  const token = getAuthToken();

  const getDeets = async () => {
    const res = await axios.get(
      "https://server-production-411c.up.railway.app/api/users/view-user",

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const info = res.data.user;
    setFormData({
      name: info?.name == "null" ? "" : info?.name,
      username: info?.username == "null" ? "" : info?.username,
      description: info?.description == "null" ? "" : info?.description,
      website: info?.website == "null" ? "" : info?.website,
      about: info?.about == "null" ? "" : info?.about,
      avatar: info?.avatar == "null" ? "" : info?.avatar,
      Discord: info?.discord == "null" ? "" : info?.discord,
      Twitter: info?.twitter == "null" ? "" : info?.twitter,
      Instagram: info?.instagram == "null" ? "" : info?.instagram,
      Telegram: info?.telegram == "null" ? "" : info?.telegram,
      YouTube: info?.youtube == "null" ? "" : info?.youtube,
      Facebook: info?.facebook == "null" ? "" : info?.facebook,
    });
  };

  useEffect(() => {
    getDeets();
  }, []);

  const handleDeleteContact = (icon) => {
    if (icon.name === "Discord") {
      setSelectedIcons([
        {
          name: "Discord",
          icon: "ant-design:discord-outlined",
        },
      ]);
    }
    setHandles((prev) => prev.filter((handle) => handle.name !== icon.name));
    setFormData((prev) => ({
      ...prev,
      [icon.name]: "",
    }));

    setAvailableIcons((prev) => [...prev, icon]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (mediaFiles.length + files.length > 12) {
      alert("You can only upload a maximum of 12 files.");
      return;
    }

    const validatedFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (isImage && file.size > 2 * 1024 * 1024) {
        alert(`Image ${file.name} exceeds the maximum size of 2MB.`);
        return false;
      }
      if (isVideo && file.size > 4 * 1024 * 1024) {
        alert(`Video ${file.name} exceeds the maximum size of 4MB.`);
        return false;
      }
      if (!isImage && !isVideo) {
        alert(`File ${file.name} is not a valid image or video.`);
        return false;
      }
      return true;
    });

    const newMediaFiles = [...mediaFiles, ...validatedFiles].slice(0, 12);
    setMediaFiles(newMediaFiles);

    // Dynamically update formData keys
    const updatedFormData = { ...formData };
    newMediaFiles.forEach((file, index) => {
      updatedFormData[`item${index + 1}`] = file;
    });
    setFormData(updatedFormData);
  };

  const handleRemoveFile = (index) => {
    const updatedMediaFiles = mediaFiles.filter((_, i) => i !== index);
    setMediaFiles(updatedMediaFiles);

    // Remove corresponding formData key
    const updatedFormData = { ...formData };
    updatedMediaFiles.forEach((file, idx) => {
      updatedFormData[`item${idx + 1}`] = file;
    });

    // Remove extra keys after the new length
    for (let i = updatedMediaFiles.length + 1; i <= 12; i++) {
      delete updatedFormData[`item${i}`];
    }

    setFormData(updatedFormData);
  };

  const handleAvatarChange = (e) => {
    console.log(FormData);

    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Avatar file size must be less than 2MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Update the avatar with the selected file
    // setAvatar(URL.cr
    // eateObjectURL(file));
    setAvatar(file);
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  const triggerFileInput = () => {
    document.getElementById("avatarInput").click();
  };

  const SaveProfile = async (e) => {
    e.preventDefault();
    console.log(formData.Discord);
    try {
      const formdata = new FormData();
      formdata.append("name", formData.name);
      formdata.append("username", formData.username);
      formdata.append("description", formData.description);
      formdata.append("website", formData.website);
      formdata.append("about", formData.about);
      formdata.append("avatar", formData.avatar);
      formdata.append("discord", formData.Discord);
      formdata.append("twitter", formData.Twitter);
      formdata.append("instagram", formData.Instagram);
      formdata.append("telegram", formData.Telegram);
      formdata.append("youtube", formData.YouTube);
      formdata.append("facebook", formData.Facebook);

      mediaFiles.forEach((file, index) => {
        formdata.append(`item${index + 1}`, file);
      });
      if (!token) {
        toast.error("Connect Wallet");
        return;
      }
      const res = await axios.post(
        "https://server-production-411c.up.railway.app/api/users/edit-user",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status == 200) {
        toast.success("Profile successful");
      }
      getDeets();
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  return (
    <div className="pt-36 bg-pages relative">
      <div className="absolute inset-0 z-0">
        <img
          src={Cloud1}
          alt=""
          className="absolute md:top-[350px] top-[100px] left-0 w-64 animate-upAndDown"
        />
        <img
          src={Cloud3}
          alt=""
          className="absolute md:top-[700px] top-[650px] right-0 w-64 animate-upAndDown"
        />
        <img
          src={Cloud2}
          alt=""
          className="absolute md:top-[1100px] top-[1200px] left-0 w-64 animate-upAndDown"
        />
      </div>

      <div className="px-5 md:px-20 pb-20 relative z-10">
        <h2
          className="text-white font-itim  text-3xl mb-1 md:text-4xl"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Profile
        </h2>
        <p
          className="text-slate-300 font-inter font-[400] text-[16px]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Share a little bit about yourself in the metaverse!
        </p>
        <div className=" b font-itim text-white bg-login flex items-center justify-center h-[200px] mt-5 rounded-md">
          <p className="opacity-60 text-xl">Upload banner</p>
        </div>
        <div className="bg-login mt-10 rounded-md px-5 lg:px-32 py-8">
          <div className="flex md:flex-row gap-8 md:gap-0 flex-col justify-between md:items-center">
            <div className="bg-[#104C86] border-2 flex items-center justify-center relative w-44 h-40 border-white rounded-md">
              <img
                src={`${BASE_URL}/${formData.avatar}`}
                alt=""
                className="max-w-full max-h-full rounded-full"
              />
              <Icons
                onClick={triggerFileInput}
                icon="basil:add-outline"
                width="30"
                className="absolute bottom-2 text-white right-2"
              />{" "}
              <input
                id="avatarInput"
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className=" lg:w-1/4 md:w-2/4 w-full">
              <div className="flex items-start gap-4 ">
                <BlueButton
                  text={`Save`}
                  innerClassName={`text-sm`}
                  onClick={SaveProfile}
                />
                <BlueButton
                  text={`Cancel`}
                  innerClassName={`text-sm`}
                  outerClassName={`bg-none`}
                />
              </div>
              <p className="flex font-inter text-white opacity-80 gap-2 items-center md:justify-center mt-5">
                <Icons icon="tabler:eye" className="md:text-2xl text-xl " />
                View Profile
              </p>
            </div>
          </div>
          <div className="my-4 mt-9 grid md:gap-20 gap-7 md:grid-cols-2">
            <div>
              <label
                htmlFor="username"
                className="text-white font-inter text-lg"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="xxxxxxxxxxxxxxxxx"
                className="bg-[#114d86] w-full text-white outline-none focus:shadow-2xl focus:ring-2 focus:ring-blue-100 border-2 mt-1 border-white rounded-md text-xl p-3"
              />
            </div>
            <div>
              <label htmlFor="name" className="text-white font-inter text-lg">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="xxxxxxxxxxxxxxxxx"
                className="bg-[#104C86] w-full text-white outline-none focus:shadow-2xl focus:ring-2 focus:ring-blue-100 border-2 mt-1 border-white rounded-md text-xl p-3"
              />
            </div>
          </div>{" "}
          <div className="my-7">
            <label htmlFor="website" className="text-white font-inter text-lg">
              Personal website URL
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="xxxxxxxxxxxxxxxxx"
              className="bg-[#104C86] w-full text-white outline-none focus:shadow-2xl focus:ring-2 focus:ring-blue-100 border-2 mt-1 border-white rounded-md text-xl p-3"
            />
          </div>
          <div className="">
            <label htmlFor="about" className="text-white font-inter text-lg">
              About me
            </label>
            <textarea
              id="about"
              name="about"
              // value={formData.about}
              // onChange={handleChange}
              rows={10}
              value={formData.about}
              onChange={handleTextChange}
              maxLength={maxLength}
              placeholder="xxxxxxxxxxxxxxxxx"
              className="bg-[#104C86] w-full text-white outline-none focus:shadow-2xl focus:ring-2 focus:ring-blue-100 border-2 mt-1 border-white rounded-md text-xl p-3"
            />{" "}
            <div className="t text-right text-white font-itim">
              {text.length}/{maxLength}
            </div>
          </div>
          <div className="text-white my-7 mb-14">
            {" "}
            <label htmlFor="about" className="text-white font-inter text-lg">
              Contact information
            </label>
            <p className="t text-white font-[300]">
              Allow users to see this information on my profile—I understand and
              accept that I may be exposed to spam, phishing, and other threats.
            </p>
            <h3 className="font-semibold mb-2 mt-4">Handles</h3>
            <div className="">
              {handles.length > 0 ? (
                <div className="flex gap-4 items-center">
                  {handles.map((handle, index) => (
                    <span
                      key={index}
                      className="flex relative items-center pb-2"
                    >
                      <Icons icon={handle.icon} width="36" />{" "}
                      <button
                        onClick={() => handleDeleteContact(handle)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 pb-[6px] flex items-center justify-center text-lg rounded-full hover:bg-red-600"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-300">No handles added yet.</p>
              )}
              {selectedIcons.map((icon, index) => (
                <div
                  key={index}
                  className="lg:grid grid-cols-2 mb-4 mt-4 gap-5"
                >
                  <div className="flex relative items-center gap-2  rounded-lg">
                    <Icons icon={icon.icon} width="50" />
                    <input
                      type="text"
                      // value={formData[icon.name]}
                      placeholder={`Enter ${icon.name} URL`}
                      onChange={(e) =>
                        handleInputChange(icon.name, e.target.value)
                      }
                      className="flex-1 bg-[#104C86] w-full text-white outline-none focus:shadow-2xl focus:ring-2 focus:ring-blue-100 border-2 mt-1 border-white rounded-md text-xl p-3"
                    />

                    <div
                      className={` mb-6 absolute top-4 right-2 ${
                        index === 0 ? "block" : "hidden"
                      }`}
                    >
                      <button
                        className="w-14  bg-[#104C86] flex items-center justify-center hover:text-indigo-300"
                        onClick={() => setToggleDropdown(!toggleDropdown)}
                      >
                        <Icons icon="icon-park-solid:down-one" width="25" />
                      </button>
                      {toggleDropdown && (
                        <ul className="absolute z-10 w-fit bg-[#104C86] border border-gray-300 rounded-lg mt-1 shadow-lg">
                          {availableIcons.map((icon, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelectIcon(icon)}
                            >
                              <Icons icon={icon.icon} width="24" />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddContact(icon)}
                    className=" w-fit h-fit flex items-center my-auto gap-2 text-white text-xl font-itim rounded-lg hover:text-indigo-300"
                  >
                    <Icons icon="basil:add-outline" width="25" />
                    Add Contact
                  </button>
                </div>
              ))}{" "}
            </div>
          </div>
          <div className="">
            <label
              htmlFor="description"
              className="text-white font-inter text-lg"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={10}
              name="description"
              value={formData.description}
              onChange={handleTextChange2}
              maxLength={maxLength}
              placeholder="xxxxxxxxxxxxxxxxx"
              className="bg-[#104C86] w-full text-white outline-none focus:shadow-2xl focus:ring-2 focus:ring-blue-100 border-2 mt-1 border-white rounded-md text-xl p-3"
            />{" "}
            <div className="t text-right text-white font-itim">
              {text2.length}/{maxLength}
            </div>
          </div>
          <div className="text-white">
            <label htmlFor="photos" className="text-white font-inter text-lg">
              Photos
            </label>
            <p className="t  font-[300]">
              Add up to 12 images and YouTube videos.
            </p>
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="flex items-center mt-4 text-lg font-itim gap-2"
            >
              <Icons icon="basil:add-outline" width="25" />
              Add item
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            {mediaFiles.length > 0 && (
              <div className="mt-6 grid md:grid-cols-5 grid-cols-3 gap-4">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        className="w-full h-24 object-cover rounded-md"
                        controls
                      />
                    )}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs hover:bg-red-600"
                    >
                      x
                    </button>
                  </div>
                ))}{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
