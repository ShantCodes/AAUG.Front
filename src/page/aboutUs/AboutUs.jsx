import React from 'react';
import historyImage from '../../assets/AAUG-transparent.png'; // Replace with actual image path
import missionImage from '../../assets/AAUG-transparent.png';
import communityImage from '../../assets/AAUG-transparent.png';

const AboutUs = () => {
    return (
      <div className="bg-gray-100 py-10 px-4 mt-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600">Մեր Մասին</h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            1943 թւականի դեկտեմբերին մի խումբ տարբեր մասնագիտութիւներով համալսարանական 
            ուսանողներ և շրջանաւարտներ հիմնադրեցին Հայ Համալսարանականների Ընդհանուր 
            Միութիւնը հայ հասարակութեան առողջապահական, կրթական և հասարակական կարիքները 
            հոգալու նպատակով։ Նրանք երիտասարդի աւիւնով և խանդավառութեամբ համախմբեցին իրենց 
            ուժերն և անմիջական ցուցաբերւած օգնութիւններով, յոյսի աղբիւր դարձան իրենց 
            հայրենակիցների համար։
          </p>
        </div>
  
        {/* History Section */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Մեր Պատմութիւնը</h2>
            <p className="text-gray-700 text-lg">
              Մինչ օրս միութեանս անդամները իրենց ուրոյն դերն և ազդեցութիւնն ունեն 
              համայնքային կեանքում։
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={historyImage} alt="History" className="w-full h-full object-cover" />
          </div>
        </div>
  
        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center bg-blue-50 rounded-lg shadow-md overflow-hidden mb-10">
          <div className="md:w-1/2 order-2 md:order-1">
            <img src={missionImage} alt="Mission" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-6 order-1 md:order-2">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Մեր Առաքելութիւնը</h2>
            <p className="text-gray-700 text-lg">
              Տարիների ընթացքում միութիւնս ստանձնեց "Սովորեցնելով ենք սովորում" 
              կարգախօսը։ Այդ առաքելութիւնը ի կատար ածելու նպատակով միութիւնս բազմիցս 
              կազմակերպել է գիտական և ուսումնական տարբեր միջոցառումներ և դասընթացներ 
              տարբեր տարիքային խմբերի համար։
            </p>
          </div>
        </div>
  
        {/* Community Involvement Section */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Համայնքային Ներգործութիւն</h2>
            <p className="text-gray-700 text-lg">
              Երիտասարդ ուսանողները միշտ եղել են միութեանս ուշադրութեան կենտրոնում։ Այսօր 
              ևս միութիւնը ընդգրկելով իրենց միութեան աշխատանքներին առիթ է տալիս իրենց 
              զարգացնելու միմիանց գիտելիքները և իրենց եռանդն ու ճաշակը բերելու համայնքային 
              կեանքին։
            </p>
          </div>
          <div className="md:w-1/2">
            <img src={communityImage} alt="Community" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;