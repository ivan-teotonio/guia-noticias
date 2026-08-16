function status(request, response) {
  response.status(200).json({ status: "São acima de média" });
}

export default status;
