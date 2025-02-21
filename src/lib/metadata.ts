import { Metadata } from "next";

export const pageMetadata = {
  "/": {
    title: "Ana Sayfa - Altıneller Spor Kulübü",
    description:
      "Çocuklar için basketbol ve voleybol antrenmanları sunan profesyonel spor kulübümüz hakkında bilgi alın. Şimdi kayıt olun ve sporun keyfini çıkarın!",
  },
  aboutUs: {
    title: "Hakkımızda - Altıneller Spor Kulübü",
    description:
      "Altıneller Spor Kulübü, olarak çocuklara yönelik voleybol ve basketbol eğitimleri veriyoruz. Vizyonumuz, misyonumuz ve eğitmen kadromuz hakkında bilgi edinin.",
  },
  basketballClasses: {
    title: "Basketbol Kursları - Altıneller Spor Kulübü",
    description:
      "Çocuklar için özel basketbol kurslarımız ile temel ve ileri düzeyde eğitim veriyoruz. Alanında uzman antrenörlerle gelişiminize katkı sağlayın!",
  },
  volleyballClasses: {
    title: "Voleybol Kursları - Altıneller Spor Kulübü",
    description:
      "Çocuklara yönelik voleybol kurslarımızla temel becerileri öğrenin, takım ruhunu keşfedin ve profesyonel eğitmenler eşliğinde gelişin!",
  },
  ourTeam: {
    title: "Ekibimiz - Altıneller Spor Kulübü",
    description:
      "Deneyimli basketbol ve voleybol antrenörlerimizle tanışın. Çocuklara özel eğitim veren uzman kadromuz hakkında detaylı bilgi alın.",
  },
  contactUs: {
    title: "Bize Ulaşın - Altıneller Spor Kulübü",
    description:
      "Bizimle iletişime geçin! Basketbol ve voleybol kurslarımız hakkında bilgi almak için adres, telefon ve e-posta bilgilerinizi öğrenin.",
  },
  registrationFiles: {
    title: "Kayıt Belgeleri - Altıneller Spor Kulübü",
    description:
      "Basketbol ve voleybol kurslarımıza kayıt için gerekli belgeleri buradan indirin ve kayıt sürecini tamamlayın.",
  },
  ourCamps: {
    title: "Kamplarımız - Altıneller Spor Kulübü",
    description:
      "Spor kamplarımız hakkında detaylı bilgi alın. Basketbol ve voleybol kamplarımızla çocukların fiziksel ve mental gelişimini destekleyin.",
  },
  news: {
    title: "Haberler - Altıneller Spor Kulübü",
    description:
      "Kulübümüzle ilgili en güncel haberleri ve etkinlik duyurularını takip edin. Basketbol ve voleybol dünyasından gelişmeleri kaçırmayın!",
  },
  services: {
    title: "Hizmetlerimiz - Altıneller Spor Kulübü",
    description:
      "Basketbol ve voleybol kurslarımız, özel antrenman programlarımız ve diğer spor hizmetlerimiz hakkında bilgi alın.",
  },
};
type PageMetadataKeys = keyof typeof pageMetadata;

export const getMetadata = (path: PageMetadataKeys): Metadata => {
  return (
    pageMetadata[path] || {
      title: "Basketbol ve Voleybol Kursları - Altıneller Spor Kulübü",
      description:
        "Çocuklar için basketbol ve voleybol antrenmanları sunan profesyonel spor kulübümüz hakkında bilgi alın.",
    }
  );
};
