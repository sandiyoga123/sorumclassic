import image from "/src/assets/image.png";
import hayabusa from "/src/assets/hayabusa.avif";
import home1 from "/src/assets/home1.png";
import home2 from "/src/assets/home2.png";
import home3 from "/src/assets/home3.png";

const Home = () => {
  return (
    <>
      <img src={image} alt="Gambar" className="w-full" />
      <div className="p-6">
        <section className="max-w-6xl mx-auto">
          <h1 className="text-center font-semibold text-3xl underline mb-8">Tentang Showroom Classic</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Row */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9">
                <img src={home1} alt="Classic motorcycle showroom" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-gray-700/80 p-4 rounded-lg">
                <p className="text-white text-center">Sorum Classic.25 adalah sorum motor bekas klasik rumahan yang mengusung slogan "Berniaga sambil Bernostalgia".</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9">
                <img src={home2} alt="Classic motorcycle display" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-gray-700/80 p-4 rounded-lg">
                <p className="text-white text-center">Tempat ini menjadi cocok bagi pecinta motor klasik, antik, dan berkarisma.</p>
              </div>
            </div>

            {/* Third Row - Full Width on Mobile */}
            <div className="relative md:col-span-2">
              <div className="aspect-w-16 aspect-h-9">
                <img src={home3} alt="Vintage motorcycle collection" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-gray-700/80 p-4 rounded-lg">
                <p className="text-white text-center">Menawarkan koleksi kendaraan yang penuh nilai sejarah dan gaya. Cocok untuk Anda yang ingin menemukan motor unik dengan cerita dan karakter yang kuat.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
