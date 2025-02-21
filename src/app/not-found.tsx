export default function NotFound() {
  return (
    <section className="section-404">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-404">
              <h1>404</h1>
              <h3>Opps! Aradığınız sayfa bulunamadı!</h3>
              <p>
                Aradığınız sayfa mevcut değil, silinmiş veya adı değiştirilmiş.
              </p>

              <a href="/">
                <i className="fa fa-home text-3xl"></i> Ana Sayfaya Dön
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
