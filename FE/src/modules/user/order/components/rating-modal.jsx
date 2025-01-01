import { Button, Modal, Textarea } from "flowbite-react";
import { useState } from "react";
import { Star } from "lucide-react";
import { useToast } from "../../../../templates/toast/ToastManager";
import Cards from "./cards";
import { fetchAddReview } from "../../../../API/order";

function RatingModal({ order, setStatus }) {
  const addToast = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    rating: 0,
    review: "",
  });

  // Hover state for rating stars
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleReviewChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      review: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.rating === 0) {
      addToast("Mohon berikan rating terlebih dahulu", "danger");
      return;
    }

    if (formData.review.trim() === "") {
      addToast("Mohon berikan review terlebih dahulu", "danger");
      return;
    }

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetchAddReview(order.id, formData, token);

      addToast(response.data.message, "success");
      if (setStatus) {
        setStatus("Riwayat");
      }
      setOpenModal(false);
      setFormData({ rating: 0, review: "" });
    } catch (e) {
      if (typeof e.response.data.message !== "string") {
        Object.values(e.response.data.message).map((val) => {
          addToast(val, "danger");
        });
      } else {
        addToast(e.response.data.message, "danger");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 text-nowrap">
        Berikan Review
      </button>
      <Modal
        show={openModal}
        onClose={() => {
          if (!isLoading) {
            setOpenModal(false);
            setFormData({ rating: 0, review: "" });
            setHoveredRating(0);
          }
        }}
        size="5xl"
      >
        <Modal.Header>Berikan Review</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* Rating Stars */}
            <div className="space-y-2 flex flex-col justify-center items-center">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onMouseEnter={() => setHoveredRating(star)} onMouseLeave={() => setHoveredRating(0)} onClick={() => handleRatingClick(star)} className="focus:outline-none">
                    <Star size={32} className={`transition-colors ${star <= (hoveredRating || formData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Review</label>
              <Textarea rows={4} placeholder="Berikan review Anda disini..." value={formData.review} onChange={handleReviewChange} className="w-full resize-none" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="dark" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Mengunggah..." : "Beri Review"}
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setOpenModal(false);
              setFormData({ rating: 0, review: "" });
              setHoveredRating(0);
            }}
            disabled={isLoading}
          >
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RatingModal;
