import { useEffect, useState } from "react";
import { buy, Cloud1, Cloud2, Cloud3 } from "../assets";
import { MarketCard } from "./components";
import { useAppKitAccount } from "@reown/appkit/react";

import axios from "axios";

const Market = () => {
  const { isConnected } = useAppKitAccount();
  const [totalNfts, setTotalNfts] = useState(0); // Store total NFT count
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (isConnected) {
      // Fetch NFTs for the current page
      axios
        .get(
          `https://server-production-411c.up.railway.app/api/nfts/load?page=${currentPage}`
        ) // Pass currentPage to API
        .then((response) => {
          setNfts(response.data.nfts); // response.data.nfts.data contains the paginated NFTs
          setTotalNfts(response.data.totalNfts); // response.data.totalNfts contains the total NFT count
          setTotalPages(response.data.pagination.last_page); // response.data.pagination.last_page contains the total number of pages
          setIsLoading(false);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching NFTs:", error);
          setIsLoading(false);
        });
    }
  }, [isConnected, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pt-36 bg-pages md:min-h-[1300px] min-h-[1400px] relative">
      <div className="absolute inset-0 z-0">
        <img
          src={Cloud1}
          alt=""
          className="absolute md:top-[450px] top-[200px] left-0 w-64 animate-upAndDown"
        />
        <img
          src={Cloud3}
          alt=""
          className="absolute md:top-[800px] top-[750px] right-0 w-64 animate-upAndDown"
        />
        <img
          src={Cloud2}
          alt=""
          className="absolute md:top-[1200px] top-[1300px] left-0 w-64 animate-upAndDown"
        />
      </div>

      <div className="px-5 md:px-20 pb-20 relative z-10">
        <h2
          className="text-white font-itim text-3xl mb-1 md:text-4xl"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Explore Land & Estates
        </h2>
        <p
          className="text-slate-300 font-inter font-[400] text-[16px]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Discover Land & Estates and start creating unique Experiences in the
          Metaverse.
        </p>

        <h2
          className="text-white font-itim mt-7 text-2xl mb-1"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Land & Estates{" "}
          <span className="font-inter font-[200] text-sm">({totalNfts})</span>
        </h2>

        {isLoading ? (
          <p>Loading NFTs...</p>
        ) : (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {nfts.map((nft) => (
              <MarketCard
                key={nft.id}
                tokenId={nft.tokenId}
                image={nft.image}
                name={nft.name}
                price={nft.price}
                coordinates={nft.coordinates}
                src={buy}
                onSale={true}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Market;
