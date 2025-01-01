import { initFlowbite } from "flowbite";
import { Accordion } from "flowbite-react";

const FAQ = () => {
  return (
    <div className="flex justify-center p-6">
      <div className="w-full md:w-[80%]">
        <h1 className="text-2xl font-semibold text-center mb-4">Frequently Asked Question</h1>

        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title>Apa itu Showroom Classic.25?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Showroom Classic.25 adalah showroom motor klasik rumahan yang berfokus pada penjualan dan koleksi motor-motor klasik berkualitas. Kami mengusung slogan "Berniaga sambil Bernostalgia" karena kami percaya setiap motor klasik
                memiliki cerita dan nilai sejarah yang unik.
              </p>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>Bagaimana cara melakukan pembelian motor klasik di Showroom Classic.25?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Proses pembelian motor klasik di showroom kami sangat mudah. Anda dapat mengunjungi showroom secara langsung untuk melihat koleksi yang tersedia. Setelah memilih motor yang diinginkan, kami akan membantu proses administrasi
                dan dokumentasi yang diperlukan. Kami juga menyediakan konsultasi mengenai sejarah dan kondisi setiap motor.
              </p>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>Apakah Showroom Classic.25 menerima tukar tambah?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Ya, kami menerima tukar tambah untuk motor klasik yang memenuhi standar kualitas kami. Setiap motor yang akan ditukar tambah akan melalui proses pemeriksaan menyeluruh untuk menentukan nilai tukarnya. Kami sangat
                memperhatikan keaslian dan kondisi motor dalam proses tukar tambah.
              </p>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>Bagaimana dengan garansi dan after sales service?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Setiap motor klasik yang kami jual mendapatkan garansi mesin selama 1 bulan. Kami juga menyediakan layanan after sales berupa konsultasi perawatan dan rekomendasi bengkel khusus motor klasik yang terpercaya. Tim mekanik kami
                siap membantu jika ada kendala teknis setelah pembelian.
              </p>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>Apakah tersedia layanan restorasi motor klasik?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Ya, kami menyediakan layanan restorasi motor klasik dengan tim ahli yang berpengalaman. Proses restorasi dilakukan dengan memperhatikan keaslian dan menggunakan spare part original atau yang sesuai dengan standar pabrikan.
                Kami akan memberikan konsultasi mendetail mengenai proses dan biaya restorasi.
              </p>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title>Bagaimana cara mendapatkan informasi update koleksi terbaru?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Anda dapat mengikuti akun media sosial kami untuk mendapatkan informasi terbaru tentang koleksi motor klasik yang baru masuk. Kami juga memiliki grup komunitas untuk para pecinta motor klasik dimana kami secara rutin
                membagikan informasi dan tips perawatan motor klasik.
              </p>
              <p className="text-gray-500 dark:text-gray-400">Ikuti kami di:</p>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                <li>Instagram: @showroomclassic.25</li>
                <li>Facebook: Showroom Classic.25</li>
                <li>WhatsApp: +62xxx-xxxx-xxxx</li>
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
