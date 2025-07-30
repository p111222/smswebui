const handleDownloadChatFile = async (
    axiosPrivate,
    id,
    filename,
    setLoading,
    setShowToast,
    setMessage,
    setType
) => {
    setLoading(true);
    try {
        const response = await axiosPrivate.post(
            `/api/support-tickets/downloadchat/${id}`,
            {},
            {
                responseType: "blob",
            }
        );
        const blob = new Blob([response.data], {
            type: response.headers["content-type"],
        });

        // Create a link element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setLoading(false);
    } catch (err) {
        console.error("Error downloading file:", err);
        setLoading(false);
        setMessage("Something went wrong");
        setShowToast(true);
        setType("error");
    }
};

export default handleDownloadChatFile