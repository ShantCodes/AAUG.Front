import React from 'react';
import historyImage from '../../assets/aaugold4.jpg'; // Replace with actual image path
import missionImage from '../../assets/aaugold3.jpg';
import communityImage from '../../assets/AAUG-transparent.png';
import aaugLogo from '../../assets/AAUG-transparent2.png';
import MobileNavMenu from '../../_components/MobileNavMenu';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-10 px-4 mt-20">
       {/* Mobile Navigation Menu */}
       <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <MobileNavMenu />
      </div>
      {/* Header Section */}
      <div className="text-center mb-20 flex flex-col items-center md:flex-row md:justify-center relative">
        <img src={aaugLogo} className="w-1/3 max-w-xs md:w-1/6 md:mr-4" alt="AAUG Logo" />
        <h1 className="text-2xl md:text-4xl font-bold text-blue-600 text-center mt-4 md:mt-0">
          Հայ Համալսարանականների Ընդհանուր Միութիւն
        </h1>
      </div>

      {/* History Section */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden mb-10">
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-xl md:text-3xl font-semibold text-blue-600 mb-4">Մեր Պատմութիւնը</h2>
          <p className="text-gray-700 text-sm md:text-lg mb-5">
            Երբ Երկրորդ Աշխարհամարտի բոցը դեռ սպառնում էր կլանել աշխարհը, իսկ Իրանը եւս յայտնւել
            էր պատերազմող ջրերի թատերաբեմում, բժշկագիտականի մի խումբ հայ երիտասարդներ,
            գիւղական շրջաններից Թեհրան տեղափոխւած հայերին բժշկական օգնութիւններ տրամադրելու
            նպատակով համախմբեցին ուժերն ու կամքը, առաջին աղիւսի օրինակով 1943 թւականին հիմքը
            դրեցին Հայ Համալսարանականների Ընդհանուր միութեանը:
          </p>
          <p className="text-gray-700 text-sm md:text-lg mb-5">
            1943 թւականի դեկտեմբերին մի խումբ տարբեր մասնագիտութիւներով համալսարանական
            ուսանողներ և շրջանաւարտներ հիմնադրեցին Հայ Համալսարանականների Ընդհանուր
            Միութիւնը հայ հասարակութեան առողջապահական, կրթական և հասարակական կարիքները
            հոգալու նպատակով։
          </p>
          <p className="text-gray-700 text-sm md:text-lg">
            Մինչ օրս միութեանս անդամներն իրենց ուրոյն դերը և ազդեցութիւնն ունեն
            համայնքային կեանքում։
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={historyImage}
            alt="History"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col md:flex-row items-center bg-blue-50 rounded-lg shadow-md overflow-hidden mb-10">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <img
            src={missionImage}
            alt="Mission"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 order-1 md:order-2">
          <p className="text-gray-700 text-sm md:text-lg">
            Միութեանն անդամակցած ուսանողներից շատերին այսօր կարելի է երկրի յայտնի գիտաշխատողների
            շարքերում տեսնել:
          </p>
          <h2 className="text-xl md:text-3xl font-semibold text-blue-600 mb-4 mt-10 md:mt-36">
            Մեր նպատակը
          </h2>
          <p className="text-gray-700 text-sm md:text-lg">
            Տարիների ընթացքում միութիւնը ստանձնել է "Սովորեցնելով ենք սովորում"
            կարգախօսի վրայ հիմնւած առաքելութիւնը։
          </p>
        </div>
      </div>

      {/* Community Involvement Section */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden mb-10">
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-xl md:text-3xl font-semibold text-blue-600 mb-4">Համայնքային Ներգործութիւն</h2>
          <p className="text-gray-700 text-sm md:text-lg">
            Երիտասարդ ուսանողները միշտ եղել են միութեանս ուշադրութեան կենտրոնում։ Այսօր
            ևս միութիւնը ընդգրկելով նրանց՝ միութեան աշխատանքների մէջ, ուսանողին առիթ է տալիս
            զարգացնել  գիտելիքները։
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={communityImage}
            alt="Community"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
