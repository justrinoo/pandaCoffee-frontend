import { Layout, Button } from "components";
import Image from "next/image";
import dummy from "public/images/profileDummy.png";
import edit from "public/icons/pencil.svg";

export default function Profile() {
  return (
    <>
      <Layout pageTitle="Profile" isLogged={true}>
        <div className="profile__bg py-4 ">
          <div className="container">
            <h1 className="profile__header">User Profile</h1>
            <div className="profile__content my-4">
              <div className="row">
                <div className="col-lg-4 col-sm-12 profile__info">
                  <div className="profile__image">
                    <Image src={dummy} alt="" className="rounded-circle" />
                    <h5>Zulaikha</h5>
                    <p>zulaikha@gmail.com</p>
                    <Button childrenClassName="profile__choose--button">
                      Choose photo
                    </Button>
                    <Button childrenClassName="profile__remove--button">
                      Remove photo
                    </Button>
                  </div>
                  <div className="profile__edit--password">
                    <Button childrenClassName="profile__edit--button">
                      Edit Password
                    </Button>
                  </div>
                  <div className="profile__save">
                    <h4>Do you want to save the change?</h4>
                    <Button childrenClassName="profile__save--button">
                      Save Change
                    </Button>
                    <Button childrenClassName="profile__cancel--button">
                      Cancel
                    </Button>
                    <Button childrenClassName="profile__edit--button">
                      Log out
                    </Button>
                  </div>
                </div>
                <div className="col-lg-8 col-sm-12 profile__desc">
                  <div className="profile__contacts mb-4">
                    <h4>Contacts</h4>
                    <div className="profile__edit--pencil">
                      <img src="/icons/pencil.svg" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-7 col-sm-12 profile__input">
                      <p>Email adress:</p>
                      <input type="text" placeholder="zulaikha17@gmail.com" />
                    </div>
                    <div className="col-lg-5 col-sm-12 profile__input">
                      <p>Mobile number:</p>
                      <input type="number" placeholder="(+62)813456782" />
                    </div>
                  </div>
                  <div className="col-lg-7 col-sm-12 profile__input">
                    <p>Delivery adress:</p>
                    <input
                      type="text"
                      placeholder="Iskandar Street no. 67 Block A Near Bus Stop"
                    />
                  </div>
                  <div className="profile__details">
                    <h4>Details</h4>
                  </div>
                  <div className="row">
                    <div className="col-lg-7 col-sm-12 profile__input">
                      <p>Display name:</p>
                      <input type="text" placeholder="Zulaikha" />
                    </div>
                    <div className="col-lg-5 col-sm-12 profile__input">
                      <p>DD/MM/YY</p>
                      <input type="date" placeholder="03/04/90" />
                    </div>
                  </div>
                  <div className="col-lg-7 col-sm-12 profile__input">
                    <p>First name:</p>
                    <input type="text" placeholder="Zulaikha" />
                  </div>
                  <div className="col-lg-7 col-sm-12 profile__input">
                    <p>Last name:</p>
                    <input type="text" placeholder="Nirmala" />
                  </div>
                  <div className="profile__gender">
                    <div className="gender">
                      <input type="radio" value="MALE" name="gender" />
                      <h4>Male</h4>
                    </div>
                    <div className="gender">
                      <input type="radio" value="FEMALE" name="gender" />
                      <h4>Female</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
