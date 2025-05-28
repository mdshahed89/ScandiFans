"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import PlanIcon from "@/assets/PlanIcon.png";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import { FaArrowLeft } from "react-icons/fa";
import { useData } from "@/context/Context";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { SignOutButton } from "@/utils/Util";
import Slider from "react-slick";
import Logo from "@/assets/Logo.png"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

type Plan = {
  day: number;
  price: number;
  text: string;
};

type PlansProps = {
  selectedPlan: Plan;
  setSelectedPlan: React.Dispatch<React.SetStateAction<Plan>>;
};

const Page = () => {
  const { userData } = useData();
  const [selectedPlan, setSelectedPlan] = useState({
    day: 7,
    price: 449,
    text: "Best for testing exposure",
  });
  const searchParams = useSearchParams();
  const value = searchParams.get("query");
  const planPrice = searchParams.get("price");
  const planDuration = searchParams.get("duration");
  const [isMount, setIsMount] = useState(true);

  useEffect(() => {
    setIsMount(false);
  }, []);

  if (isMount) {
    return null;
  }

  // if(userData?.isPlanActive && userData?.planDuration){

  // }

  return (
    <div className=" bg-gradient-to-tr from-[#000] via-[#000] to-[#470012] min-h-screen h-full text-[#fff] ">
      <div className=" max-w-[1400px] mx-auto h-full ">
        <div className=" h-[5rem] flex items-center justify-between  ">
          <Link href={`/`} className=" text-[2rem] ">
            <Image src={Logo} alt="Logo" className=" w-[10rem] mt-5 object-contain " />
          </Link>
          <SignOutButton />
        </div>

        <div className=" min-h-[calc(100vh-5rem)] pt-[2rem] pb-[5rem] ">
          {value === "overview" ? (
            <Overview />
          ) : value === "payment" && planDuration && planPrice ? (
            <MakePayment
              selectedPlan={selectedPlan}
              // setSelectedPlan={setSelectedPlan}
              planDuration={planDuration}
              planPrice={planPrice}
            />
          ) : (
            <Plans
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

type MakePaymentProps = {
  selectedPlan: Plan;
  planDuration: string;
  planPrice: string;
};

const MakePayment: React.FC<MakePaymentProps> = ({
  selectedPlan,
  planDuration,
  planPrice,
}) => {
  const { userData } = useData();

  return (
    <div className=" max-w-[1400px] mx-auto leading-tight flex ">
      <div className=" flex-1 ">
        <div className=" flex items-center gap-4 ">
          <Link
            href={`/planer`}
            className=" bg-[#800020] p-3 rounded-full w-fit text-[#F4F1ED] shadow-inner "
          >
            <FaArrowLeft />
          </Link>
          <div className=" text-[1.5rem] font-medium ">ScandiFans</div>
        </div>

        <div className=" max-w-[30rem] mt-[2rem] space-y-2 ">
          <div className=" text-[1.2rem] text-[#d1d1d1] font-semibold ">
            Step 3 of 3
          </div>
          <h3 className=" text-[1.7rem] font-semibold leading-tight text-[#F4F1ED] ">
            Set up your credit or debit card
          </h3>
        </div>

        <div className=" mt-[2rem] ">
          <div className=" font-semibold text-[#c5c5c5] ">Subscription Fee</div>
          <div className=" flex items-center gap-3 mt-2 ">
            <div className=" text-[2.5rem] font-bold text-[#F4F1ED] ">
              Nok {planPrice}
            </div>
            <div className=" text-lg leading-none space-y-1 font-medium text-[#d6d6d6] ">
              <div>For</div>
              <div>{planDuration} Days</div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex-1  px-[2rem] ">
        <div className=" max-w-[30rem] ">
          <div className=" space-y-7 ">
            <h3 className=" text-[1.2rem] font-medium ">Contact Information</h3>
            <div className=" flex items-center border-2 border-[#bdbdbd] bg-[#4ED7F1]/10 rounded-md py-2 px-3 gap-16 w-full ">
              <div>Email</div>
              <div>{userData?.email}</div>
            </div>
          </div>

          <h3 className=" text-[1.2rem] font-medium mt-[5rem] mb-[2rem] ">
            Payment Method
          </h3>
          <Elements stripe={stripePromise}>
            <Form
              selectedPlan={selectedPlan}
              planDuration={planDuration}
              planPrice={planPrice}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  return (
    <div className=" max-w-[25rem] mx-auto pt-[5rem] ">
      <div>
        <Image
          src={PlanIcon}
          alt="Plan icon"
          className=" w-[13rem] mx-auto object-contain "
        />
      </div>
      <div className=" max-w-[30rem] text-center mx-auto mt-[2rem] ">
        <div className=" text-[1.5rem] text-[#d1d1d1] font-semibold ">
          Step 2 of 3
        </div>
        <h3 className=" text-[3rem] font-bold leading-tight text-[#F4F1ED] ">
          Choose your plan
        </h3>
      </div>

      <div className=" mt-[2rem] space-y-3 w-fit mx-auto ">
        <div className=" flex items-center gap-3 ">
          <div className=" text-[1.3rem] text-[#800020] ">
            <GiCheckMark />
          </div>
          <p className=" text-[1.1rem] text-[#cac8c6] ">
            No commitments, cancel anytime.
          </p>
        </div>
        <div className=" flex items-center gap-3 ">
          <div className=" text-[1.3rem] text-[#800020] ">
            <GiCheckMark />
          </div>
          <p className=" text-[1.1rem] text-[#cac8c6] ">
            No commitments, cancel anytime.
          </p>
        </div>
        <div className=" flex items-center gap-3 ">
          <div className=" text-[1.3rem] text-[#800020] ">
            <GiCheckMark />
          </div>
          <p className=" text-[1.1rem] text-[#cac8c6] ">
            No commitments, cancel anytime.
          </p>
        </div>
        <div className=" flex items-center gap-3 ">
          <div className=" text-[1.3rem] text-[#800020] ">
            <GiCheckMark />
          </div>
          <p className=" text-[1.1rem] text-[#cac8c6] ">
            No commitments, cancel anytime.
          </p>
        </div>
      </div>
      <div className=" mt-[2rem] ">
        <Link
          href={`/planer`}
          className=" bg-[#800020] text-[#F4F1ED] w-full py-2 rounded-md block text-center font-medium text-[1.1rem] mx-auto cursor-pointer "
        >
          Next
        </Link>
      </div>
    </div>
  );
};

const Plans: React.FC<PlansProps> = ({ selectedPlan, setSelectedPlan }) => {
  const points = [
    "Featured placement on homepage & discovery sections",
    "Highlighted in the ScandiFans newsletter",
    "Boosted visibility in search results",
    "Priority support",
    "Increased profile reach across partner platforms",
  ];

  const plans = [
    {
      day: 7,
      price: 449,
      text: "Best for testing exposure",
    },
    {
      day: 15,
      price: 799,
      text: "Great value for two weeks",
    },
    {
      day: 30,
      price: 1399,
      text: "Most popular",
    },
    {
      day: 60,
      price: 2299,
      text: "Save more",
    },
    {
      day: 90,
      price: 2899,
      text: "Ideal for serious growth",
    },
    {
      day: 180,
      price: 4499,
      text: "Best long-term investment",
    },
  ];
  const [durationOpen, setDurationOpen] = useState(false);

  const durationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        durationRef.current &&
        !durationRef.current.contains(event.target as Node)
      ) {
        setDurationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const settings = {
    dots: true,
    className: "center",
    infinite: true,
    centerPadding: "80px",
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: false,
    // afterChange: function(index) {
    //   console.log(
    //     `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //   );
    // }
  };

  return (
    <div className=" pt-[5rem] ">
      <div className=" text-center ">
        <div className=" text-[1.5rem] text-[#d1d1d1] font-semibold ">
          Step 3 of 3
        </div>
        <div className=" max-w-[50rem] mx-auto ">
          <h2 className=" text-[3rem] font-bold  leading-tight mt-[.5rem] mb-[1.5rem] ">
            Boost your profile with ScandiFans Promotion Packages
          </h2>
          <p className=" text-lg ">
            Want more traffic, visibility, and subscribers? Our promotion
            packages are designed to push your profile to the top of ScandiFans
            — making you more discoverable and increasing your chances of
            success.
          </p>
        </div>
      </div>

      {/* <div>
        {
          plans.map((plan, idx) => (
            <div key={idx}>
              <div className=" flex items-center justify-between ">
                <div>
                  <div>{plan.text}</div>
                  <div>{plan.day}</div>
                </div>
                <div>
                  <GiCheckMark />
                </div>
              </div>
            </div>
          ))
        }
      </div> */}

      <div className="slider-container mt-[3rem] pb-10 ">
        <Slider {...settings}>
          {plans.map((plan, idx) => (
            <div
              onClick={() => setSelectedPlan(plan)}
              key={idx}
              className=" w-[20rem] px-2 cursor-pointer "
            >
              <div
                className={` ${
                  selectedPlan.text === plan.text
                    ? "border-[#c92a51]"
                    : "border-[#333333]"
                } border-2  hover:border-[#c92a51] p-[1rem] rounded-xl flex flex-col justify-between h-[11rem] transition-all duration-300 ease-in-out `}
              >
                <div className=" flex items-center justify-between ">
                  <div className=" space-y-1 ">
                    <div className=" text-sm text-[#fc3265] ">{plan.text}</div>
                    <div className=" text-[1.5rem] leading-tight ">
                      {plan.day} Days
                    </div>
                  </div>
                  {selectedPlan.text === plan.text && (
                    <div className=" text-[#fc3265] text-[1.4rem] ">
                      <GiCheckMark />
                    </div>
                  )}
                </div>
                <div className=" text-[1.2rem] ">Nok {plan.price}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className=" mt-[2rem] flex  ">
        <div className=" border-2 border-[#333333] text-[#cac8c6] w-[25rem] mx-auto px-[2rem] pb-[1rem] rounded-xl relative overflow-hidden ">
          {/* <div className=" absolute w-2 h-2 rounded-full bg-[#4ED7F1] top-5 left-5 "></div>
          <div className=" absolute w-6 h-6 rounded-full bg-[#4ED7F1] top-16 -left-3 "></div>
          <div className=" absolute w-6 h-6 rounded-full bg-[#d3d4d4] top-16 -right-3 "></div>
          <div className=" absolute w-4 h-4 rounded-full bg-[#4ED7F1] top-[10rem] left-[3rem] "></div>
          <div className=" absolute w-4 h-4 rounded-full bg-[#4ED7F1] top-[10rem] right-[3rem] "></div>
          <div className=" absolute w-3 h-3 rounded-full bg-[#4ED7F1] top-[3rem] right-[2rem] "></div> */}

          <div className=" mt-[3rem] space-y-3 ">
            {points.map((point, idx) => (
              <div key={idx} className=" flex gap-3 ">
                <div className=" text-[1.3rem] text-[#fc3265] mt-1 ">
                  <GiCheckMark />
                </div>
                <p className=" text-[1.1rem] text-[#F4F1ED] ">{point}</p>
              </div>
            ))}
          </div>

          <div className=" pt-[5rem] w-full ">
            <Link
              href={`/planer?query=payment&duration=${selectedPlan.day}&price=${selectedPlan.price}`}
              className=" w-full py-2 block text-center rounded-md px-10 bg-[#800020] text-[#F4F1ED] font-medium text-[1.1rem] "
            >
              Next
            </Link>
          </div>
        </div>

        {/* <div className=" flex justify-end flex-1 ">
          <div className="w-[10rem] relative space-y-2 " ref={durationRef}>
            <div
              className="w-full px-4 py-2 border-2 border-[#4ED7F1] rounded-md cursor-pointer flex items-center justify-center gap-3 text-[#4ED7F1] "
              onClick={() => setDurationOpen(!durationOpen)}
            >
              <span className="  ">{selectedPlan.day} Days</span>
              <IoIosArrowDown
                className={` ${
                  durationOpen ? "rotate-180" : ""
                } transition-all duration-300 ease-in-out text-[1.1rem] `}
              />
            </div>
            {durationOpen && (
              <ul className="absolute w-full border-2 border-[#4ED7F1] rounded-lg mt-1 shadow-lg z-10 text-center ">
                {plans.map((plan, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md "
                    onClick={() => {
                      setSelectedPlan(plan);
                      setDurationOpen(false);
                    }}
                  >
                    {plan.day} Days
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

const Form: React.FC<MakePaymentProps> = ({ planDuration, planPrice }) => {
  const { userData, setUserData } = useData();

  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Norway");
  const countryRef = useRef<HTMLDivElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "Norway",
    countryCode: "NO",
    address1: "",
    address2: "",
    city: "",
    postCode: "",
  });
  const router = useRouter();
  const [error, setError] = useState({
    message: "",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const countries = [
    { name: "Afghanistan", code: "AF" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Andorra", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Brazil", code: "BR" },
    { name: "Brunei", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cabo Verde", code: "CV" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
    { name: "Chile", code: "CL" },
    { name: "China", code: "CN" },
    { name: "Colombia", code: "CO" },
    { name: "Comoros", code: "KM" },
    { name: "Congo (Congo-Brazzaville)", code: "CG" },
    { name: "Costa Rica", code: "CR" },
    { name: "Croatia", code: "HR" },
    { name: "Cuba", code: "CU" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Democratic Republic of the Congo", code: "CD" },
    { name: "Denmark", code: "DK" },
    { name: "Djibouti", code: "DJ" },
    { name: "Dominica", code: "DM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Ecuador", code: "EC" },
    { name: "Egypt", code: "EG" },
    { name: "El Salvador", code: "SV" },
    { name: "Equatorial Guinea", code: "GQ" },
    { name: "Eritrea", code: "ER" },
    { name: "Estonia", code: "EE" },
    { name: "Eswatini", code: "SZ" },
    { name: "Ethiopia", code: "ET" },
    { name: "Fiji", code: "FJ" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "Gabon", code: "GA" },
    { name: "Gambia", code: "GM" },
    { name: "Georgia", code: "GE" },
    { name: "Germany", code: "DE" },
    { name: "Ghana", code: "GH" },
    { name: "Greece", code: "GR" },
    { name: "Grenada", code: "GD" },
    { name: "Guatemala", code: "GT" },
    { name: "Guinea", code: "GN" },
    { name: "Guinea-Bissau", code: "GW" },
    { name: "Guyana", code: "GY" },
    { name: "Haiti", code: "HT" },
    { name: "Honduras", code: "HN" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Jamaica", code: "JM" },
    { name: "Japan", code: "JP" },
    { name: "Jordan", code: "JO" },
    { name: "Kazakhstan", code: "KZ" },
    { name: "Kenya", code: "KE" },
    { name: "Kiribati", code: "KI" },
    { name: "Kuwait", code: "KW" },
    { name: "Kyrgyzstan", code: "KG" },
    { name: "Laos", code: "LA" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lesotho", code: "LS" },
    { name: "Liberia", code: "LR" },
    { name: "Libya", code: "LY" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Madagascar", code: "MG" },
    { name: "Malawi", code: "MW" },
    { name: "Malaysia", code: "MY" },
    { name: "Maldives", code: "MV" },
    { name: "Mali", code: "ML" },
    { name: "Malta", code: "MT" },
    { name: "Marshall Islands", code: "MH" },
    { name: "Mauritania", code: "MR" },
    { name: "Mauritius", code: "MU" },
    { name: "Mexico", code: "MX" },
    { name: "Micronesia", code: "FM" },
    { name: "Moldova", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Mongolia", code: "MN" },
    { name: "Montenegro", code: "ME" },
    { name: "Morocco", code: "MA" },
    { name: "Mozambique", code: "MZ" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "North Korea", code: "KP" },
    { name: "North Macedonia", code: "MK" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestine State", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Qatar", code: "QA" },
    { name: "Romania", code: "RO" },
    { name: "Russia", code: "RU" },
    { name: "Rwanda", code: "RW" },
    { name: "Saint Kitts and Nevis", code: "KN" },
    { name: "Saint Lucia", code: "LC" },
    { name: "Saint Vincent and the Grenadines", code: "VC" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "South Korea", code: "KR" },
    { name: "South Sudan", code: "SS" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },
    { name: "Suriname", code: "SR" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syria", code: "SY" },
    { name: "Tajikistan", code: "TJ" },
    { name: "Tanzania", code: "TZ" },
    { name: "Thailand", code: "TH" },
    { name: "Timor-Leste", code: "TL" },
    { name: "Togo", code: "TG" },
    { name: "Tonga", code: "TO" },
    { name: "Trinidad and Tobago", code: "TT" },
    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },
    { name: "Turkmenistan", code: "TM" },
    { name: "Tuvalu", code: "TV" },
    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Vanuatu", code: "VU" },
    { name: "Vatican City", code: "VA" },
    { name: "Venezuela", code: "VE" },
    { name: "Vietnam", code: "VN" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      type: "",
      message: "",
    });

    if (!stripe || !elements) {
      setError({
        type: "ERROR",
        message: "Stripe has not loaded yet.",
      });
      setIsLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      setError({
        type: "ERROR",
        message: "Card input not found.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userData?._id}/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.token}`,
          },
          body: JSON.stringify({ amount: Number(planPrice) }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError({
          type: "ERROR",
          message: data?.message || "Failed to create payment intent.",
        });
        setIsLoading(false);
        return;
      }

      const { clientSecret, paymentIntentId } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: formData.name,
            email: userData?.email,
            address: {
              line1: formData.address1,
              line2: formData.address2,
              city: formData.city,
              postal_code: formData.postCode,
              country: formData.countryCode,
            },
          },
        },
      });

      if (result.error) {
        setError({
          type: "ERROR",
          message: result.error.message || "Payment failed. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        const confirmResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userData?._id}/payment/confirm-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData?.token}`,
            },
            body: JSON.stringify({ paymentIntentId, planDuration }),
          }
        );

        const confirmData = await confirmResponse.json();

        if (!confirmResponse.ok) {
          setError({
            type: "ERROR",
            message: confirmData?.message || "Payment confirmation failed!",
          });
          setIsLoading(false);
          return;
        }
        setSuccess(true);

        setTimeout(() => {
          // setSuccess(false);
          router.push(`/profile/${userData?._id}`);
        }, 2000);

        setUserData({
          ...userData,
          isPlanActive: confirmData.user?.isPlanActive,
          planDuration: confirmData.user?.planDuration,
        });

        console.log("✅ Payment successful and plan activated.");
        setError({
          type: "SUCCESS",
          message: "Payment confirmed successfully!!",
        });
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setError({
        type: "ERROR",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(formData);

  return (
    <div>
      <form onSubmit={handleSubmit} className="  ">
        <div className=" space-y-10 ">
          <div className=" space-y-2 ">
            <label htmlFor="">Card Information</label>
            <CheckoutForm />
          </div>

          <div className=" space-y-2 ">
            <label htmlFor="">Cardholder Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name on card"
              className=" outline-none border-2 rounded-md text-[1.1rem] text-[#fff] border-[#cac8c6] w-full py-2 bg-transparent px-3 "
            />
          </div>

          <div className=" space-y-2 ">
            <label htmlFor="">Country or region</label>
            <div className=" border-2 border-[#cac8c6] rounded-md ">
              <div
                className=" relative text-center border-b-2 border-[#cac8c6] "
                ref={countryRef}
              >
                <div
                  className="w-full px-3 py-2 cursor-pointer flex items-center justify-between gap-3 text-[#d1d1d1] "
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{formData.country}</span>
                  <IoIosArrowDown
                    className={` ${
                      isOpen ? "rotate-180" : ""
                    } transition-all duration-300 ease-in-out text-[1.1rem] `}
                  />
                </div>
                {isOpen && (
                  <ul className="absolute w-full border-2 border-gray-700 rounded-lg mt-1 shadow-lg z-10 bg-gray-700 max-h-[15rem] overflow-y-auto custom-scrollbar ">
                    {countries.map((country, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md "
                        onClick={() => {
                          setFormData({
                            ...formData,
                            country: country.name,
                            countryCode: country.code,
                          });
                          setIsOpen(false);
                        }}
                      >
                        {country.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className=" border-b-2 border-[#cac8c6] ">
                <input
                  type="text"
                  placeholder="Address line 1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className=" w-full py-2 outline-none bg-transparent px-3  "
                />
              </div>
              <div className=" border-b-2 border-[#cac8c6] ">
                <input
                  type="text"
                  placeholder="Address line 2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className=" w-full py-2 outline-none bg-transparent px-3  "
                />
              </div>

              <div className=" flex border-b-2 border-[#cac8c6] ">
                <div className=" flex-1 ">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className=" border-r-2 border-[#cac8c6] w-full py-2 outline-none bg-transparent px-3  "
                  />
                </div>
                <div className=" flex-1 ">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleChange}
                    className=" w-full py-2 outline-none bg-transparent px-3  "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" min-h-[1rem] my-[1rem] ">
          {error.type && error.message && (
            <div
              className={` ${
                error.type === "ERROR" ? "text-red-500" : "text-green-500"
              } `}
            >
              {error.message}
            </div>
          )}
        </div>

        <div>
          <button className="relative w-full h-[3rem] px-5 bg-[#800020] rounded-md text-[#F4F1ED] overflow-hidden">
            <div className="flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-[#000] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : success ? (
                <div className="flex items-center justify-center gap-2 text-green-500 ">
                  <GiCheckMark className="" />
                  <span>Success</span>
                </div>
              ) : (
                <span>Subscribe</span>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

function CheckoutForm() {
  return (
    <div>
      <div className=" border-2 border-[#cac8c6] bg-[#4ED7F1]/5 rounded-md mb-4">
        <div className=" p-4 border-b-2 border-[#cac8c6] ">
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#fff",
                  "::placeholder": {
                    color: "#9b9b9b",
                  },
                  iconColor: "#4ED7F1",
                  backgroundColor: "transparent",
                },
                invalid: {
                  color: "#ff6b6b",
                  iconColor: "#ff6b6b",
                },
              },
              showIcon: true,
              placeholder: "1234 1234 1234 1234",
            }}
          />
        </div>

        <div className="flex gap-3 ">
          <div className="flex-1 p-3 border-r-2 border-[#cac8c6] ">
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#fff",
                    "::placeholder": {
                      color: "#9b9b9b",
                    },
                  },
                },
              }}
            />
          </div>
          <div className="flex-1 p-3 ">
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#fff",
                    "::placeholder": {
                      color: "#9b9b9b",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      {/* <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing…" : "Pay $50"}
      </button> */}
    </div>
  );
}
