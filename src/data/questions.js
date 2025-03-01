// Kategori sabitleri
export const CATEGORIES = {
  ALL: "all",
  HTML: "html",
  CSS: "css",
  JAVASCRIPT: "javascript",
  REACT: "react",
};

// Kategori isimleri
export const CATEGORY_NAMES = {
  [CATEGORIES.ALL]: "Tüm Konular",
  [CATEGORIES.HTML]: "HTML",
  [CATEGORIES.CSS]: "CSS",
  [CATEGORIES.JAVASCRIPT]: "JavaScript",
  [CATEGORIES.REACT]: "React",
};

export const questions = [
  {
    id: 1,
    category: "html",
    question: "HTML nedir ve ne işe yarar?",
    answer:
      "HTML (HyperText Markup Language), web sayfalarının yapılandırılmasını ve içeriğinin tanımlanmasını sağlayan bir işaretleme dilidir. Web tarayıcıları bu işaretleme dilini kullanarak web sayfalarını görüntüler.",
    options: [
      "Web sayfalarının yapılandırılmasını ve içeriğinin tanımlanmasını sağlayan bir işaretleme dilidir",
      "Bir programlama dilidir",
      "Bir veritabanı yönetim sistemidir",
      "Bir grafik tasarım aracıdır",
    ],
    correctOption: 0,
  },
  {
    id: 2,
    category: "html",
    question: "HTML5'in öne çıkan özellikleri nelerdir?",
    answer:
      "HTML5, video ve ses gibi multimedya içeriklerini destekler, yerel depolama yetenekleri sunar, daha semantik etiketler içerir (örneğin <header>, <footer>, <nav>), form geliştirmeleri sağlar ve daha iyi çizim ve grafik yetenekleri sunar.",
    options: [
      "Sadece metin içeriği destekler",
      "Video ve ses desteği, yerel depolama, semantik etiketler, form geliştirmeleri ve grafik yetenekleri",
      "Sadece tablo yapısı sunar",
      "Sadece resim gösterimi sağlar",
    ],
    correctOption: 1,
  },
  {
    id: 3,
    category: "css",
    question: "CSS nedir ve ne işe yarar?",
    answer:
      "CSS (Cascading Style Sheets), web sayfalarının görünümünü düzenlemek için kullanılan bir stil dilidir. HTML'in yapısını belirlerken, CSS, bu yapının nasıl görüntüleneceğini tanımlar.",
    options: [
      "Bir programlama dilidir",
      "Bir veritabanı sistemidir",
      "Web sayfalarının görünümünü düzenlemek için kullanılan bir stil dilidir",
      "Bir işletim sistemidir",
    ],
    correctOption: 2,
  },
  {
    id: 4,
    category: "css",
    question: "CSS seçicileri nelerdir ve nasıl kullanılır?",
    answer:
      "CSS seçicileri, HTML elementlerini ve öğelerini hedeflemek için kullanılan kod parçacıklarıdır. Örneğin, element adıyla (div, p), sınıf adıyla (.class), ID ile (#id), alt elementlerle (parent > child) ve daha fazlasıyla seçim yapabilirsiniz.",
    options: [
      "Sadece ID'lerle seçim yapılabilir",
      "Sadece class'larla seçim yapılabilir",
      "Element adı, sınıf adı, ID ve alt elementlerle seçim yapılabilir",
      "Seçici kullanılamaz",
    ],
    correctOption: 2,
  },
  {
    id: 5,
    category: "javascript",
    question: "JavaScript nedir ve ne işe yarar?",
    answer:
      "JavaScript, web tarayıcılarında çalışabilen bir programlama dilidir. Genellikle web sayfalarının dinamik içeriğini yönetmek, kullanıcı etkileşimlerini sağlamak ve web uygulamalarını geliştirmek için kullanılır.",
    options: [
      "Sadece sunucu tarafında çalışan bir dildir",
      "Web tarayıcılarında çalışan, dinamik içerik ve etkileşim sağlayan bir programlama dilidir",
      "Bir veritabanı yönetim sistemidir",
      "Bir işletim sistemidir",
    ],
    correctOption: 1,
  },
  {
    id: 6,
    category: "javascript",
    question: "JavaScript'te asenkron programlama nedir?",
    answer:
      "JavaScript'te asenkron programlama, belirli işlemlerin diğer işlemlerin bitmesini beklemeden eşzamanlı olarak gerçekleştirilmesini sağlar. Promise, async/await ve callback'ler kullanılarak yönetilir.",
    options: [
      "Kodun sıralı olarak çalışmasıdır",
      "İşlemlerin eşzamanlı olarak gerçekleştirilmesidir",
      "Sadece tek bir işlemin çalışmasıdır",
      "Kodun çalışmamasıdır",
    ],
    correctOption: 1,
  },
  {
    id: 7,
    category: "react",
    question: "React nedir ve ne işe yarar?",
    answer:
      "React, kullanıcı arayüzü oluşturmak için kullanılan bir JavaScript kütüphanesidir. Tek sayfa uygulamaları geliştirmek için kullanılır.",
    options: [
      "Bir veritabanı sistemidir",
      "Bir sunucu tarafı dilidir",
      "Kullanıcı arayüzü oluşturmak için kullanılan bir JavaScript kütüphanesidir",
      "Bir işletim sistemidir",
    ],
    correctOption: 2,
  },
  {
    id: 8,
    category: "react",
    question: "React'te state ve props arasındaki fark nedir?",
    answer:
      "State, bir bileşenin iç durumunu tutar ve bileşen içinde değiştirilebilir. Props, bir bileşene dışarıdan geçirilen verilerdir ve değiştirilemezler.",
    options: [
      "İkisi de aynı şeydir",
      "State değiştirilemez, props değiştirilebilir",
      "State bileşen içinde değiştirilebilir, props dışarıdan gelir ve değiştirilemez",
      "İkisi de değiştirilebilir",
    ],
    correctOption: 2,
  },
  {
    id: 9,
    category: "html",
    question: "HTML ve XHTML arasındaki farklar nelerdir?",
    answer:
      "HTML daha esnek bir yapıya sahip olan ve hatalara daha hoşgörülü olan bir işaretleme dilidir. XHTML, XML tabanlı bir işaretleme dilidir ve daha katı bir yapıya sahiptir, hatalara daha az hoşgörülüdür.",
    options: [
      "İkisi tamamen aynıdır",
      "HTML daha esnek, XHTML daha katı kurallara sahiptir",
      "XHTML daha eski bir teknolojidir",
      "HTML sadece metin içerir",
    ],
    correctOption: 1,
  },
  {
    id: 10,
    category: "html",
    question: "HTML semantik elemanları nelerdir ve neden önemlidirler?",
    answer:
      "HTML semantik elemanlar, içeriklerinin anlamını tanımlamak için kullanılan etiketlerdir. Örneğin <header>, <footer>, <nav>, <article> gibi. Bu etiketler, web tarayıcılarına ve arama motorlarına sayfanın yapısını daha iyi anlamaları için rehberlik eder.",
    options: [
      "Sadece görsel düzen için kullanılır",
      "İçeriğin anlamını tanımlar ve SEO için önemlidir",
      "Sadece stil vermek için kullanılır",
      "Hiçbir önemi yoktur",
    ],
    correctOption: 1,
  },
  {
    id: 11,
    category: "css",
    question:
      "CSS'te inline, internal ve external stil sayfaları arasındaki farklar nelerdir?",
    answer:
      "Inline CSS, HTML elementinin içine yazılan stil tanımlarıdır. Internal CSS, <style> etiketi içinde HTML sayfasının <head> bölümünde tanımlanan stil tanımlarıdır. External CSS ise ayrı bir CSS dosyasında tanımlanan ve HTML sayfasına <link> etiketi ile bağlanan stil dosyasıdır.",
    options: [
      "Hepsi aynı şeydir",
      "Inline en yüksek önceliğe sahiptir, external en düşük",
      "External en yüksek önceliğe sahiptir",
      "Internal CSS kullanılmamalıdır",
    ],
    correctOption: 1,
  },
  {
    id: 12,
    category: "css",
    question: "CSS Grid ve Flexbox arasındaki farklar nelerdir?",
    answer:
      "CSS Grid, iki boyutlu düzenler oluşturmak için kullanılırken, Flexbox genellikle tek boyutlu düzenler oluşturmak için kullanılır. Grid, satırlar ve sütunlar arasında düzen sağlar, Flexbox ise içeriklerin bir eksen boyunca hizalanmasını sağlar.",
    options: [
      "İkisi aynı işi yapar",
      "Grid tek boyutlu, Flexbox iki boyutludur",
      "Grid iki boyutlu, Flexbox tek boyutludur",
      "İkisi de kullanılmamalıdır",
    ],
    correctOption: 2,
  },
  {
    id: 13,
    category: "javascript",
    question: "JavaScript'te Closure (Kapanış) nedir ve nasıl çalışır?",
    answer:
      "Closure, bir iç fonksiyonun dış kapsamındaki değişkenlere erişmesine izin veren bir JavaScript özelliğidir. Closure, dış kapsamındaki değişkenlere erişimi kapanmış bir iç fonksiyonu içeren fonksiyonlardır.",
    options: [
      "Sadece global değişkenleri kullanmaktır",
      "İç fonksiyonun dış kapsamdaki değişkenlere erişmesidir",
      "Fonksiyonları kapatmaktır",
      "Değişkenleri silmektir",
    ],
    correctOption: 1,
  },
  {
    id: 14,
    category: "javascript",
    question: "Promise nedir ve nasıl kullanılır?",
    answer:
      "Promise, JavaScript'te asenkron programlamada kullanılan bir yapıdır. Bir işlemin tamamlanması veya başarısız olması durumunda gerçekleştirilecek işlemleri temsil eder.",
    options: [
      "Senkron programlama için kullanılır",
      "Asenkron işlemleri yönetmek için kullanılan bir yapıdır",
      "Sadece hata yakalamak için kullanılır",
      "Değişken tanımlamak için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 15,
    category: "react",
    question: "React Context API nedir ve ne işe yarar?",
    answer:
      "React Context API, bileşenler arasında veri paylaşımını kolaylaştıran bir React API'sidir. Veri, bileşenler hiyerarşisi boyunca geçirilirken ara bileşenlerden geçirme zorunluluğunu azaltır.",
    options: [
      "Sadece stil vermek için kullanılır",
      "Bileşenler arası veri paylaşımını kolaylaştırır",
      "Sadece state yönetimi için kullanılır",
      "Routing için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 16,
    category: "react",
    question: "React Hooks nedir ve neden kullanılır?",
    answer:
      "React Hooks, fonksiyonel bileşenlerde state ve yaşam döngüsü özelliklerini kullanabilmemizi sağlayan ve sınıf bileşenlerinden kurtulan React özellikleridir.",
    options: [
      "Sadece class componentler için kullanılır",
      "Fonksiyonel bileşenlerde state ve lifecycle özelliklerini kullanmayı sağlar",
      "Sadece routing için kullanılır",
      "Sadece stil vermek için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 17,
    category: "html",
    question: "HTML validasyonu neden önemlidir ve bunu nasıl yaparsınız?",
    answer:
      "HTML validasyonu, web sayfalarının standartlara uygun olup olmadığını kontrol etmenin bir yoludur. Doğru yapılandırılmış bir HTML, tarayıcılar arasında tutarlılık ve erişilebilirlik sağlar. HTML validasyonunu, çeşitli çevrimiçi araçlar veya W3C'nin resmi doğrulama servisi aracılığıyla gerçekleştirebilirsiniz.",
    options: [
      "Sadece görsel düzen için önemlidir",
      "Standartlara uygunluk ve tarayıcı uyumluluğu için önemlidir",
      "Sadece SEO için önemlidir",
      "Önemsizdir",
    ],
    correctOption: 1,
  },
  {
    id: 18,
    category: "html",
    question: "'DOCTYPE' nedir ve ne işe yarar?",
    answer:
      "<!DOCTYPE> belgesi, web tarayıcısına hangi HTML veya XHTML sürümünün kullanıldığını bildiren bir beyandır. Tarayıcı, bu bildirimi kullanarak sayfanın nasıl işleneceğini belirler.",
    options: [
      "Sadece bir yorum satırıdır",
      "Tarayıcıya HTML sürümünü bildiren bir beyandır",
      "CSS dosyasını tanımlar",
      "JavaScript kodunu başlatır",
    ],
    correctOption: 1,
  },
  {
    id: 19,
    category: "html",
    question: "'data-' öznitelikleri nedir ve ne amaçla kullanılır?",
    answer:
      "'data-' öznitelikleri, özel veri noktalarını HTML ve JavaScript arasında iletmek için kullanılan özel özniteliklerdir. Bu öznitelikler, özelleştirilmiş veri tutma ve işleme için kullanılabilir.",
    options: [
      "Sadece stil vermek için kullanılır",
      "HTML ve JavaScript arasında veri iletimi için kullanılır",
      "Sadece görsel efektler için kullanılır",
      "Sadece form validasyonu için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 20,
    category: "html",
    question: "'alt' özniteliği nedir ve neden önemlidir?",
    answer:
      "'alt' özniteliği, bir görüntünün alternatif metnini tanımlar. Görüntü yüklenemediğinde veya kullanıcılar için görüntüleri engelleyen durumlarda, 'alt' metni, kullanıcıya görüntünün içeriğini açıklar.",
    options: [
      "Sadece görüntü boyutunu belirler",
      "Görüntü yüklenemediğinde alternatif metin sağlar ve erişilebilirlik için önemlidir",
      "Sadece görüntü stilini belirler",
      "Önemsiz bir özelliktir",
    ],
    correctOption: 1,
  },
  {
    id: 21,
    category: "css",
    question: "CSS öncelikli kural nedir ve nasıl belirlenir?",
    answer:
      "CSS öncelikli kural, bir elemente uygulanacak olan birden fazla stil kuralı arasında hangisinin öncelikli olduğunu belirler. Öncelik, genellikle spesifiklik, önem ve stil sırasına göre belirlenir.",
    options: [
      "Rastgele belirlenir",
      "Spesifiklik, önem ve stil sırasına göre belirlenir",
      "Sadece sıraya göre belirlenir",
      "Sadece class ismine göre belirlenir",
    ],
    correctOption: 1,
  },
  {
    id: 22,
    category: "css",
    question: "CSS önişlemcileri nedir ve yaygın örnekleri nelerdir?",
    answer:
      "CSS önişlemcileri, CSS yazımını daha verimli ve etkili hale getiren araçlardır. Sass, Less, Stylus gibi önişlemci diller, CSS yazımını daha modüler, organize ve yeniden kullanılabilir hale getirir.",
    options: [
      "Sadece renk kodları için kullanılır",
      "CSS yazımını daha verimli hale getiren araçlardır (Sass, Less, Stylus)",
      "Sadece font tanımlamaları için kullanılır",
      "JavaScript alternatifidir",
    ],
    correctOption: 1,
  },
  {
    id: 23,
    category: "css",
    question: "'box model' nedir ve CSS'te nasıl kullanılır?",
    answer:
      "Box model, bir HTML elementinin içeriğini, dolgusunu, kenarlığını ve dış boşluğunu belirler. Bu özellikler, width, height, padding, border, margin gibi CSS özellikleriyle kontrol edilir.",
    options: [
      "Sadece margin değerlerini belirler",
      "Bir elementin içerik, padding, border ve margin değerlerini belirleyen modeldir",
      "Sadece width değerini belirler",
      "Sadece height değerini belirler",
    ],
    correctOption: 1,
  },
  {
    id: 24,
    category: "css",
    question: "'Float' ve 'clear' özellikleri ne işe yarar?",
    answer:
      "Float, bir elementin diğer elementlerin etrafına sarılmasını sağlar. Clear, float edilmiş elementlerin altına geçecek yeni içeriklerin başlangıcını belirler.",
    options: [
      "Sadece renk değerlerini belirler",
      "Elementlerin konumlandırılmasını ve float etkisini kontrol eder",
      "Sadece font boyutunu belirler",
      "Sadece arka plan rengini belirler",
    ],
    correctOption: 1,
  },
  {
    id: 25,
    category: "css",
    question: "Media queries nedir ve ne işe yarar?",
    answer:
      "Media queries, ekran boyutu, cihaz oryantasyonu, piksel yoğunluğu gibi çeşitli cihaz özelliklerine göre CSS'in nasıl uygulanacağını belirler. Bu, sayfaların farklı cihazlarda daha iyi görüntülenmesini sağlar.",
    options: [
      "Sadece masaüstü için stil tanımlar",
      "Farklı cihaz özelliklerine göre stil tanımlamayı sağlar",
      "Sadece mobil için stil tanımlar",
      "Sadece tablet için stil tanımlar",
    ],
    correctOption: 1,
  },
  {
    id: 26,
    category: "javascript",
    question: "JavaScript'te değişkenler nasıl tanımlanır ve kullanılır?",
    answer:
      "Değişkenler var, let, veya const anahtar kelimeleriyle tanımlanır. Değişkenler, değer ataması yapılarak veya boş olarak tanımlanabilir ve sonrasında bu değerler değiştirilebilir.",
    options: [
      "Sadece var ile tanımlanır",
      "var, let ve const anahtar kelimeleriyle tanımlanır",
      "Sadece const ile tanımlanır",
      "Tanımlama gerekmez",
    ],
    correctOption: 1,
  },
  {
    id: 27,
    category: "javascript",
    question: "JavaScript'in veri tipleri nelerdir?",
    answer:
      "JavaScript'te temel veri tipleri şunlardır: string, number, boolean, null, undefined, object, ve symbol.",
    options: [
      "Sadece string ve number",
      "string, number, boolean, null, undefined, object, symbol",
      "Sadece object",
      "Veri tipi yoktur",
    ],
    correctOption: 1,
  },
  {
    id: 28,
    category: "javascript",
    question: "JavaScript'te koşullu ifadeler nasıl kullanılır?",
    answer:
      "if, else if ve else ifadeleriyle koşullu ifadeler belirlenir. Bu ifadeler, belirli koşulların karşılanması durumunda farklı kod bloklarının çalıştırılmasını sağlar.",
    options: [
      "Sadece if kullanılır",
      "if, else if ve else ifadeleriyle kullanılır",
      "Sadece switch kullanılır",
      "Koşullu ifade kullanılamaz",
    ],
    correctOption: 1,
  },
  {
    id: 29,
    category: "javascript",
    question: "JavaScript'te olaylar (events) nedir ve nasıl işlenir?",
    answer:
      "Olaylar, kullanıcı etkileşimleri veya tarayıcıda meydana gelen diğer etkinliklerdir. JavaScript ile, HTML öğelerine atanmış olay dinleyicileri aracılığıyla olaylar işlenebilir.",
    options: [
      "Sadece click olayları vardır",
      "Kullanıcı etkileşimleri ve tarayıcı etkinlikleridir, event listener'lar ile işlenir",
      "Sadece form submit olayları vardır",
      "Olay işleme yoktur",
    ],
    correctOption: 1,
  },
  {
    id: 30,
    category: "javascript",
    question: "JavaScript'te DOM nedir ve nasıl kullanılır?",
    answer:
      "DOM (Document Object Model), bir HTML veya XML belgesinin yapısını temsil eden bir programlama arayüzüdür. JavaScript kullanılarak, DOM API'si aracılığıyla HTML öğelerine erişilebilir ve bu öğeler üzerinde değişiklikler yapılabilir.",
    options: [
      "Sadece stil değişiklikleri için kullanılır",
      "HTML belgesinin yapısını temsil eden ve manipüle edilmesini sağlayan bir API'dir",
      "Sadece form işlemleri için kullanılır",
      "Sadece animasyonlar için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 31,
    category: "react",
    question: "React'te bir bileşenden diğerine veri aktarımı nasıl yapılır?",
    answer:
      "Props kullanılarak bir bileşenden diğerine veri aktarımı yapılır. Eğer component'ler aynı parent içindeyse context api de kullanılabilir.",
    options: [
      "Veri aktarımı yapılamaz",
      "Props ve Context API kullanılarak yapılır",
      "Sadece global değişkenlerle yapılır",
      "Sadece state ile yapılır",
    ],
    correctOption: 1,
  },
  {
    id: 32,
    category: "react",
    question: "React'te conditional rendering nasıl yapılır?",
    answer:
      "JSX içinde if-else kullanılamaz, bunun yerine koşullu ifadeler veya koşullu operatörler kullanılır.",
    options: [
      "Sadece if-else kullanılır",
      "Koşullu ifadeler ve operatörler kullanılır",
      "Sadece switch kullanılır",
      "Conditional rendering yapılamaz",
    ],
    correctOption: 1,
  },
  {
    id: 33,
    category: "react",
    question:
      "React'te listeler nasıl oluşturulur ve döngüler nasıl kullanılır?",
    answer:
      "Listeler, .map() metodu kullanılarak oluşturulur. Bu metot, bir diziyi döngü içinde dönerek her eleman için yeni bir bileşen oluşturmanızı sağlar.",
    options: [
      "Sadece for döngüsü kullanılır",
      "map() metodu kullanılarak yapılır",
      "Sadece while döngüsü kullanılır",
      "Liste oluşturulamaz",
    ],
    correctOption: 1,
  },
  {
    id: 34,
    category: "react",
    question: "React'te form işlemleri nasıl yapılır?",
    answer:
      "Form işlemleri, kontrol bileşenleri ve olay işleyicileri kullanılarak gerçekleştirilir. Form verisi genellikle state içinde tutulur ve bir olay tetiklendiğinde güncellenir.",
    options: [
      "Sadece HTML form kullanılır",
      "Kontrollü bileşenler ve state yönetimi ile yapılır",
      "Form işlemleri yapılamaz",
      "Sadece uncontrolled componentler kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 35,
    category: "javascript",
    question: "Callback fonksiyonları nedir ve neden önemlidir?",
    answer:
      "Callback fonksiyonları, başka bir fonksiyona parametre olarak geçirilen ve o fonksiyonun tamamlandığında çağrılan fonksiyonlardır. JavaScript'te, asenkron işlemleri yönetmek ve kodun daha okunabilir ve modüler olmasını sağlamak için sıkça kullanılırlar.",
    options: [
      "Sadece senkron işlemler için kullanılır",
      "Asenkron işlemleri yönetmek ve kodu modüler hale getirmek için kullanılır",
      "Sadece hata yakalamak için kullanılır",
      "Sadece döngüler için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 36,
    category: "javascript",
    question: "Promise nedir ve nasıl kullanılır?",
    answer:
      "Promise, JavaScript'te asenkron programlamada kullanılan bir yapıdır. Bir işlemin tamamlanması veya başarısız olması durumunda gerçekleştirilecek işlemleri temsil eder.",
    options: [
      "Sadece senkron işlemler için kullanılır",
      "Asenkron işlemleri yönetmek için kullanılan bir yapıdır",
      "Sadece hata yakalamak için kullanılır",
      "Sadece döngüler için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 37,
    category: "javascript",
    question: "Async/Await nedir ve nasıl kullanılır?",
    answer:
      "Async/Await, JavaScript'te Promise tabanlı asenkron kodu daha temiz ve okunabilir hale getirmek için kullanılan bir yapıdır. async işlevleri, asenkron işlemleri gerçekleştirmek için kullanılırken, await anahtar kelimesi, bir async işlevindeki bir Promise'in tamamlanmasını bekler.",
    options: [
      "Sadece senkron kod yazmak için kullanılır",
      "Promise tabanlı asenkron kodu daha temiz ve okunabilir hale getirmek için kullanılır",
      "Sadece hata yakalamak için kullanılır",
      "Sadece döngüler için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 38,
    category: "javascript",
    question: "Modül (Module) nedir ve JavaScript'te nasıl kullanılır?",
    answer:
      "JavaScript modülleri, kodu parçalara bölmek ve parçalar arasındaki bağımlılıkları yönetmek için kullanılır. ES6 modül sistemi, export ve import anahtar kelimeleriyle modüllerin tanımlanması ve kullanılmasını sağlar.",
    options: [
      "Sadece stil tanımlamak için kullanılır",
      "Kodu parçalara bölmek ve bağımlılıkları yönetmek için kullanılır",
      "Sadece HTML kodunu düzenlemek için kullanılır",
      "Sadece CSS kodunu düzenlemek için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 39,
    category: "javascript",
    question: "JavaScript'te hata yönetimi (error handling) nasıl yapılır?",
    answer:
      "JavaScript'te hata yönetimi, try, catch, finally ifadeleriyle ve throw anahtar kelimesiyle gerçekleştirilir. try bloğu içinde olası hata oluşturabilecek kodlar yazılır, olası hatalar catch bloğunda işlenir ve finally bloğu, hata olsun olmasın her zaman çalıştırılır.",
    options: [
      "Sadece console.log ile yapılır",
      "try, catch, finally ve throw ifadeleriyle yapılır",
      "Sadece if-else ile yapılır",
      "Sadece switch-case ile yapılır",
    ],
    correctOption: 1,
  },
  {
    id: 40,
    category: "javascript",
    question: "JavaScript'te AJAX nedir ve nasıl kullanılır?",
    answer:
      "AJAX (Asenkron JavaScript ve XML), web sayfalarının arka planda sunucu ile iletişim kurmasını ve sayfa yeniden yüklenmeden içerikleri güncellemesini sağlayan bir tekniktir. JavaScript ile, XMLHttpRequest veya fetch API'si kullanılarak AJAX istekleri gönderilir ve alınan veriler sayfa içinde dinamik olarak kullanılabilir.",
    options: [
      "Sadece sayfa yenilemek için kullanılır",
      "Arka planda sunucu ile iletişim kurmak ve sayfayı dinamik güncellemek için kullanılır",
      "Sadece form göndermek için kullanılır",
      "Sadece veri silmek için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 41,
    category: "react",
    question: "React nedir ve ne işe yarar?",
    answer:
      "React, kullanıcı arayüzü oluşturmak için kullanılan bir JavaScript kütüphanesidir. Tek sayfa uygulamaları geliştirmek için kullanılır.",
    options: [
      "Sadece sunucu tarafı programlama için kullanılır",
      "Kullanıcı arayüzü oluşturmak için kullanılan bir JavaScript kütüphanesidir",
      "Sadece veritabanı işlemleri için kullanılır",
      "Sadece stil tanımlamak için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 42,
    category: "react",
    question: "React'in temel özellikleri nelerdir?",
    answer:
      "React, bileşen tabanlı bir yapıya sahiptir, sanal DOM kullanır, tek yönlü veri akışı prensibini benimser ve yeniden kullanılabilir bileşenler sağlar.",
    options: [
      "Sadece stil tanımlamaya yarar",
      "Bileşen tabanlı yapı, sanal DOM, tek yönlü veri akışı ve yeniden kullanılabilir bileşenler",
      "Sadece form işlemleri için kullanılır",
      "Sadece routing için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 43,
    category: "react",
    question: "React bileşenleri nedir ve nasıl oluşturulur?",
    answer:
      "React bileşenleri, UI'nin farklı parçalarını temsil eder. Sınıf bileşenleri veya fonksiyonel bileşenler olarak oluşturulabilirler.",
    options: [
      "Sadece HTML elementleridir",
      "UI'nin farklı parçalarını temsil eden, sınıf veya fonksiyonel olarak oluşturulabilen yapılardır",
      "Sadece stil tanımlamalarıdır",
      "Sadece JavaScript fonksiyonlarıdır",
    ],
    correctOption: 1,
  },
  {
    id: 44,
    category: "react",
    question: "JSX nedir ve React'te neden kullanılır?",
    answer:
      "JSX, JavaScript ve XML'in bir kombinasyonudur ve React bileşenlerinin UI'sini tanımlamak için kullanılır. JSX, daha okunabilir ve yazılması kolay kod yazmayı sağlar.",
    options: [
      "Sadece bir stil formatıdır",
      "JavaScript ve XML kombinasyonu, React UI'sini tanımlamak için kullanılır",
      "Sadece bir veritabanı dilidir",
      "Sadece bir programlama dilidir",
    ],
    correctOption: 1,
  },
  {
    id: 45,
    category: "react",
    question: "React'te state ve props arasındaki fark nedir?",
    answer:
      "State, bir bileşenin iç durumunu tutar ve bileşen içinde değiştirilebilir. Props, bir bileşene dışarıdan geçirilen verilerdir ve değiştirilemezler.",
    options: [
      "İkisi de aynı şeydir",
      "State bileşen içinde değiştirilebilir, props dışarıdan gelir ve değiştirilemez",
      "İkisi de değiştirilemez",
      "İkisi de değiştirilebilir",
    ],
    correctOption: 1,
  },
  {
    id: 46,
    category: "html",
    question:
      "HTML form elemanlarını sıralayın ve her birinin amacını açıklayın.",
    answer:
      "Form elemanları arasında <input>, <textarea>, <select>, <button> gibi ögeler bulunur. Bunlar kullanıcı girişi almak veya kullanıcıyla etkileşimde bulunmak için kullanılır.",
    options: [
      "Sadece <input> elementi vardır",
      "<input>, <textarea>, <select>, <button> gibi elementler kullanıcı girişi için kullanılır",
      "Form elementleri kullanılmaz",
      "Sadece <button> elementi vardır",
    ],
    correctOption: 1,
  },
  {
    id: 47,
    category: "html",
    question: "HTML ve CSS arasındaki ilişki nedir?",
    answer:
      "HTML, web sayfalarının yapısını tanımlarken CSS (Cascading Style Sheets), bu yapının görüntülenme şeklini belirler. HTML, içeriği düzenlerken, CSS, bu içeriğin renkleri, boyutları, yerleşimi gibi görsel özelliklerini kontrol eder.",
    options: [
      "İkisi aynı şeydir",
      "HTML yapıyı, CSS görünümü belirler",
      "CSS yapıyı, HTML görünümü belirler",
      "İkisi de yapıyı belirler",
    ],
    correctOption: 1,
  },
  {
    id: 48,
    category: "css",
    question: "CSS animasyonları nasıl oluşturulur?",
    answer:
      "CSS animasyonları, @keyframes kuralıyla belirli bir zaman dilimi içinde elementlerin nasıl değişeceğini tanımlar. Bu animasyonlar, animation özelliğiyle elementlere uygulanır ve belirli bir süre boyunca çalıştırılır.",
    options: [
      "CSS'te animasyon yapılamaz",
      "@keyframes ve animation özellikleri kullanılarak yapılır",
      "Sadece JavaScript ile yapılabilir",
      "Sadece GIF kullanılarak yapılabilir",
    ],
    correctOption: 1,
  },
  {
    id: 49,
    category: "css",
    question: "CSS'te z-index özelliği ne işe yarar?",
    answer:
      "z-index özelliği, konumlandırılmış elementlerin üst üste binme sırasını belirler. Daha yüksek z-index değerine sahip elementler, daha düşük değere sahip elementlerin üzerinde görüntülenir.",
    options: [
      "Elementlerin genişliğini belirler",
      "Elementlerin üst üste binme sırasını belirler",
      "Elementlerin yüksekliğini belirler",
      "Elementlerin rengini belirler",
    ],
    correctOption: 1,
  },
  {
    id: 50,
    category: "css",
    question: "CSS'te BEM metodolojisi nedir?",
    answer:
      "BEM (Block Element Modifier), CSS sınıf adlandırma konvansiyonudur. Block, Element ve Modifier kavramlarını kullanarak daha organize ve bakımı kolay CSS kodu yazmayı sağlar.",
    options: [
      "Bir JavaScript kütüphanesidir",
      "CSS sınıf adlandırma metodolojisidir",
      "Bir HTML standardıdır",
      "Bir veritabanı sistemidir",
    ],
    correctOption: 1,
  },
  {
    id: 51,
    category: "javascript",
    question: "JavaScript'te 'prototype' nedir?",
    answer:
      "Prototype, JavaScript'te nesneler arasında kalıtım sağlayan bir mekanizmadır. Her JavaScript nesnesi bir prototype'a sahiptir ve bu prototype üzerinden başka nesnelerin özelliklerini ve metodlarını miras alabilir.",
    options: [
      "Sadece bir değişken türüdür",
      "Nesneler arası kalıtım sağlayan bir mekanizmadır",
      "Sadece diziler için kullanılır",
      "Bir döngü türüdür",
    ],
    correctOption: 1,
  },
  {
    id: 52,
    category: "javascript",
    question: "JavaScript'te 'strict mode' nedir?",
    answer:
      "'use strict' ifadesiyle aktifleştirilen strict mode, JavaScript kodunun daha sıkı kurallara göre çalışmasını sağlar. Hataların daha erken yakalanmasına ve daha güvenli kod yazılmasına yardımcı olur.",
    options: [
      "Bir JavaScript versiyonudur",
      "Daha sıkı kurallarla çalışmayı sağlayan bir moddur",
      "Bir hata ayıklama aracıdır",
      "Bir kod editörü özelliğidir",
    ],
    correctOption: 1,
  },
  {
    id: 53,
    category: "react",
    question: "React'te 'key' prop'u neden önemlidir?",
    answer:
      "Key prop'u, React'in liste öğelerini benzersiz şekilde tanımlamasını ve güncellemeler sırasında hangi öğelerin değiştiğini takip etmesini sağlar. Bu, performans optimizasyonu için önemlidir.",
    options: [
      "Önemsizdir",
      "Liste öğelerinin benzersiz tanımlanması ve performans için önemlidir",
      "Sadece stil vermek için kullanılır",
      "Sadece event handling için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 54,
    category: "react",
    question:
      "React'te 'useCallback' ve 'useMemo' hooks'ları arasındaki fark nedir?",
    answer:
      "useCallback fonksiyonları, useMemo ise değerleri hafızada tutar. useCallback genellikle child component'lere geçirilen callback fonksiyonlarının performansını optimize etmek için kullanılırken, useMemo hesaplama maliyeti yüksek değerleri önbelleğe almak için kullanılır.",
    options: [
      "İkisi aynı işi yapar",
      "useCallback fonksiyonları, useMemo değerleri hafızada tutar",
      "İkisi de kullanılmamalıdır",
      "Sadece state yönetimi için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 55,
    category: "react",
    question: "React'te 'useEffect' hook'u ne işe yarar?",
    answer:
      "useEffect, component'in render edilmesi sonrasında yan etkileri (side effects) yönetmek için kullanılır. API çağrıları, DOM manipülasyonları, abonelikler gibi işlemler useEffect içinde yapılır.",
    options: [
      "Sadece state güncellemek için kullanılır",
      "Yan etkileri (side effects) yönetmek için kullanılır",
      "Sadece stil değişiklikleri için kullanılır",
      "Sadece event handling için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 56,
    category: "react",
    question: "React'te performans optimizasyonu nasıl yapılır?",
    answer:
      "React'te performans optimizasyonu için React.memo(), useMemo, useCallback kullanılabilir, gereksiz render'ları önlemek için shouldComponentUpdate veya PureComponent kullanılabilir, ve büyük listeler için windowing teknikleri uygulanabilir.",
    options: [
      "Performans optimizasyonu yapılamaz",
      "memo, useMemo, useCallback ve diğer optimizasyon teknikleri kullanılır",
      "Sadece kod miktarı azaltılır",
      "Sadece resimlerin boyutu küçültülür",
    ],
    correctOption: 1,
  },
  {
    id: 57,
    category: "react",
    question: "React'te Higher Order Components (HOC) nedir?",
    answer:
      "Higher Order Components, bir componenti alıp, onu geliştirilmiş yeni bir component olarak döndüren fonksiyonlardır. Kod tekrarını önlemek ve component mantığını yeniden kullanmak için kullanılır.",
    options: [
      "Normal componentlerdir",
      "Componentleri geliştiren ve yeniden kullanılabilir mantık ekleyen fonksiyonlardır",
      "Sadece class componentlerdir",
      "Sadece fonksiyonel componentlerdir",
    ],
    correctOption: 1,
  },
  {
    id: 58,
    category: "javascript",
    question: "JavaScript'te Temporal Dead Zone (TDZ) nedir?",
    answer:
      "TDZ, let ve const ile tanımlanan değişkenlerin tanımlandıkları satırdan önceki kodda erişilemez oldukları bölgedir. Bu, değişkenlerin hoisting davranışıyla ilgilidir.",
    options: [
      "Değişkenlerin silindiği bölge",
      "let ve const değişkenlerinin erişilemez olduğu bölge",
      "Kodun çalışmadığı bölge",
      "Global scope",
    ],
    correctOption: 1,
  },
  {
    id: 59,
    category: "javascript",
    question: "JavaScript'te Event Loop nasıl çalışır?",
    answer:
      "Event Loop, JavaScript'in asenkron işlemleri yönetme mekanizmasıdır. Call stack, callback queue ve microtask queue arasındaki işlemleri koordine eder ve asenkron işlemlerin sırayla işlenmesini sağlar.",
    options: [
      "Sadece senkron işlemler için kullanılır",
      "Asenkron işlemleri yöneten ve sıralayan bir mekanizmadır",
      "Sadece DOM olayları için kullanılır",
      "Sadece setTimeout için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 60,
    category: "javascript",
    question: "JavaScript'te Memory Leak nasıl önlenir?",
    answer:
      "Memory leak'ler, gereksiz referansları temizleyerek, event listener'ları kaldırarak, circular references'ları önleyerek ve büyük nesneleri uygun şekilde yöneterek önlenebilir.",
    options: [
      "Önlenemez",
      "Gereksiz referansları temizleyerek ve uygun memory yönetimi yaparak",
      "Sadece garbage collector kullanarak",
      "Sadece değişkenleri silerek",
    ],
    correctOption: 1,
  },
  {
    id: 61,
    category: "css",
    question: "CSS'te performans optimizasyonu nasıl yapılır?",
    answer:
      "CSS performansı için seçicilerin optimize edilmesi, gereksiz kuralların kaldırılması, CSS bundle size'ın küçültülmesi, critical CSS'in inline edilmesi ve CSS preprocessor'ların etkin kullanımı önemlidir.",
    options: [
      "Performans optimizasyonu yapılamaz",
      "Seçici optimizasyonu, critical CSS ve bundle optimizasyonu yapılır",
      "Sadece renkleri değiştirerek",
      "Sadece margin değerlerini azaltarak",
    ],
    correctOption: 1,
  },
  {
    id: 62,
    category: "css",
    question: "CSS'te Stacking Context nedir?",
    answer:
      "Stacking Context, elementlerin z-ekseni üzerinde nasıl render edileceğini belirleyen hiyerarşik bir yapıdır. z-index, opacity, transform gibi özellikler yeni bir stacking context oluşturabilir.",
    options: [
      "Sadece z-index değeridir",
      "Elementlerin z-ekseni üzerindeki render hiyerarşisidir",
      "Sadece position özelliğidir",
      "Sadece display özelliğidir",
    ],
    correctOption: 1,
  },
  {
    id: 63,
    category: "html",
    question: "HTML'de SEO optimizasyonu nasıl yapılır?",
    answer:
      "SEO için semantic HTML kullanımı, doğru heading hiyerarşisi, meta etiketleri, alt attribute'ları, schema markup'ları ve sayfa yükleme performansının optimizasyonu önemlidir.",
    options: [
      "Sadece meta title kullanarak",
      "Semantic HTML, meta etiketleri ve performans optimizasyonu yaparak",
      "Sadece keywords ekleyerek",
      "Sadece resimleri optimize ederek",
    ],
    correctOption: 1,
  },
  {
    id: 64,
    category: "html",
    question:
      "HTML5 Web Storage ile localStorage ve sessionStorage arasındaki fark nedir?",
    answer:
      "localStorage verileri süresiz olarak saklar ve tarayıcı kapatılsa bile veriler kalır. sessionStorage ise verileri sadece sekme açık olduğu sürece saklar, sekme kapatıldığında veriler silinir.",
    options: [
      "İkisi aynıdır",
      "localStorage süresiz, sessionStorage sekme bazlı veri saklar",
      "İkisi de süresiz saklar",
      "İkisi de hemen siler",
    ],
    correctOption: 1,
  },
  {
    id: 65,
    category: "react",
    question: "React'te Error Boundary nedir?",
    answer:
      "Error Boundary, alt component ağacında oluşan hataları yakalayan ve bu hataları uygun şekilde işleyen component'lerdir. Kullanıcı deneyimini iyileştirmek için hata durumlarını yönetir.",
    options: [
      "Sadece console.log için kullanılır",
      "Component ağacındaki hataları yakalayan ve yöneten yapılardır",
      "Sadece network hataları için kullanılır",
      "Sadece syntax hataları için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 66,
    category: "react",
    question:
      "React'te Controlled ve Uncontrolled Components arasındaki fark nedir?",
    answer:
      "Controlled component'lerde form verileri React tarafından kontrol edilir ve state'te tutulur. Uncontrolled component'lerde ise form verileri DOM tarafından yönetilir ve ref'ler kullanılarak erişilir.",
    options: [
      "İkisi aynıdır",
      "Controlled React state'te, Uncontrolled DOM'da veri tutar",
      "İkisi de state kullanır",
      "İkisi de DOM'da veri tutar",
    ],
    correctOption: 1,
  },
  {
    id: 67,
    category: "javascript",
    question: "JavaScript'te Web Workers nedir?",
    answer:
      "Web Workers, ağır işlemleri arka planda çalıştırarak ana thread'in bloklanmasını önleyen ve çoklu thread benzeri bir yapı sağlayan bir özelliktir.",
    options: [
      "Sadece DOM manipülasyonu için kullanılır",
      "Arka plan işlemlerini ayrı thread'de çalıştıran bir özelliktir",
      "Sadece AJAX istekleri için kullanılır",
      "Sadece event handling için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 68,
    category: "javascript",
    question: "JavaScript'te Debounce ve Throttle arasındaki fark nedir?",
    answer:
      "Debounce, bir fonksiyonun çağrılmasını belirli bir süre bekleyerek son çağrıyı alır. Throttle ise bir fonksiyonun belirli bir süre içinde en fazla bir kez çalışmasını sağlar.",
    options: [
      "İkisi aynıdır",
      "Debounce son çağrıyı alır, Throttle belirli aralıklarla çalışır",
      "İkisi de anlık çalışır",
      "İkisi de hiç çalışmaz",
    ],
    correctOption: 1,
  },
  {
    id: 69,
    category: "css",
    question: "CSS'te will-change özelliği ne işe yarar?",
    answer:
      "will-change, tarayıcıya bir elementin hangi özelliklerinin değişeceğini önceden bildirerek optimizasyon yapma fırsatı verir. Animasyon performansını iyileştirmek için kullanılır.",
    options: [
      "Sadece renk değişimi için kullanılır",
      "Tarayıcıya değişecek özellikleri bildirerek performans optimizasyonu sağlar",
      "Sadece boyut değişimi için kullanılır",
      "Sadece pozisyon değişimi için kullanılır",
    ],
    correctOption: 1,
  },
  {
    id: 70,
    category: "css",
    question: "CSS'te Containment nedir?",
    answer:
      "CSS Containment, sayfanın belirli bölümlerini izole ederek render performansını artıran bir özelliktir. contain özelliği ile elementlerin layout, paint ve size davranışları kontrol edilebilir.",
    options: [
      "Sadece margin kontrolü yapar",
      "Sayfa bölümlerini izole ederek performans optimizasyonu sağlar",
      "Sadece padding kontrolü yapar",
      "Sadece border kontrolü yapar",
    ],
    correctOption: 1,
  },
];

// Kategoriye göre soruları filtreleme
export const getQuestionsByCategory = (category) => {
  if (category === CATEGORIES.ALL) return questions;
  return questions.filter((q) => q.category === category);
};

// Rastgele soru seçme
export const getRandomQuestions = (count, category = CATEGORIES.ALL) => {
  const categoryQuestions = getQuestionsByCategory(category);
  const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// ID'ye göre soru bulma
export const getQuestionById = (id) => {
  return questions.find((q) => q.id === id);
};

// Kategori istatistiklerini alma
export const getCategoryStats = () => {
  return Object.values(CATEGORIES).reduce((stats, category) => {
    if (category === CATEGORIES.ALL) return stats;
    stats[category] = questions.filter((q) => q.category === category).length;
    return stats;
  }, {});
};
