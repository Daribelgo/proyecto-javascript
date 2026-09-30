document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.querySelector("#news-list");

  if (!newsContainer) {
    return;
  }

  fetch("data/noticias.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((news) => {
      if (!Array.isArray(news)) {
        throw new Error("El archivo de noticias no contiene una lista válida.");
      }

      newsContainer.replaceChildren();

      news.forEach((item) => {
        const article = document.createElement("article");
        article.className = "card news-card";

        const date = document.createElement("time");
        date.dateTime = item.fecha;
        date.textContent = item.fechaTexto;

        const title = document.createElement("h3");
        title.textContent = item.titulo;

        const description = document.createElement("p");
        description.textContent = item.descripcion;

        article.append(date, title, description);
        newsContainer.appendChild(article);
      });
    })
    .catch((error) => {
      console.error("No se pudieron cargar las noticias:", error);
      newsContainer.replaceChildren();

      const message = document.createElement("p");
      message.className = "card";
      message.textContent = "No se han podido cargar las noticias en este momento.";
      newsContainer.appendChild(message);
    });
});
