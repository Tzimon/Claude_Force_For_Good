/* Amtsklar – guides in Turkish (AI-assisted, review welcome) */
(function (root) {
  "use strict";
  root.Amtsklar.guidesI18n = root.Amtsklar.guidesI18n || {};
  root.Amtsklar.guidesI18n.tr = {
    "jobcenter-rueckforderung": {
      t: "Jobcenter para geri istiyor",
      s: "Bir „Aufhebungs- und Erstattungsbescheid“ (iptal ve geri ödeme kararı) aldınız.",
      check: [
        "Hangi dönem ve hangi tutar? „Karar“ bölümüne bakın.",
        "Neden? Genellikle bir gelir hesaba katıldı (maaş, Kindergeld, nafaka). Maaş bordrolarınız ve hesap dökümlerinizle karşılaştırın.",
        "Maaştan muafiyet tutarları düşüldü mü? Kazancın bir kısmı hesaba katılmaz.",
        "Değişikliği zamanında bildirdiniz mi? O zaman geri ödeme çoğu zaman sınırlıdır.",
      ],
      steps: [
        "Süreyi hesaplayın: genellikle 1 ay.",
        "Bir şey yanlış veya belirsizse: itiraz edin. Gerekçeyi sonra gönderebilirsiniz.",
        "Hesaplamayı anlamıyorsanız dosyayı inceleme talebinde bulunun.",
        "Bir kerede ödeyemiyorsanız: taksit talep edin. Jobcenter yardımınızın bir kısmını da (genellikle temel tutarın %10'u) doğrudan kesebilir.",
        "Kararı bir sosyal danışmanlığa kontrol ettirin – geri ödeme talepleri sık sık hatalıdır.",
      ],
      warn: "Süre geçtiyse, yeniden inceleme başvurusu (Überprüfungsantrag) çoğu zaman hâlâ işe yarar.",
    },
    "jobcenter-einladung": {
      t: "Jobcenter'dan randevu daveti",
      s: "Belirli bir günde Jobcenter'a veya bir randevuya gelmeniz isteniyor.",
      check: [
        "Tarih, saat, yer ve ilgili kişi.",
        "Yanınızda ne getirmelisiniz? (belgeler, özgeçmiş, kimlik)",
        "İçinde „Rechtsfolgenbelehrung“ (sonuçlar hakkında bilgilendirme) var mı? O zaman gelmezseniz paranız kesilebilir.",
      ],
      steps: [
        "Randevuyu takviminize yazın ve zamanında gidin.",
        "Gelemiyorsanız (ör. iş görüşmesi, hasta çocuk): hemen ve önceden, kanıtla bildirin ve yeni bir tarih isteyin.",
        "Hasta mısınız? Hastalık raporunu gönderin. Jobcenter ayrıca randevuya gidemeyeceğinize dair bir belge isteyebilir – doktorunuza sorun.",
        "Yanınızda size destek olacak bir kişi (Beistand) getirebilirsiniz.",
        "Emin değilseniz katıldığınızı onaylatın.",
      ],
      warn: "Önemli bir sebep olmadan gelmezseniz paranız kesilebilir. Kesintiye itiraz edebilirsiniz.",
    },
    "aufenthalt-verlaengern": {
      t: "Oturum iznimin süresi doluyor",
      s: "Kartınızdaki veya pasaportunuzdaki son geçerlilik tarihi yaklaşıyor.",
      check: [
        "Kart (eAT) üzerindeki kesin son geçerlilik tarihi.",
        "Ausländerbehörde hangi belgeleri istiyor? Çoğu zaman web sitesinde bir liste vardır.",
        "Bir şey değişti mi (iş, aile, adres)? Bu önemli olabilir.",
      ],
      steps: [
        "Uzatma için erken başvurun – yaklaşık 2–3 ay önce.",
        "Boş randevu yok mu? Yine de son tarihten ÖNCE yazılı başvurun (çevrimiçi form, e-posta, mektup veya faks) ve kanıtını saklayın.",
        "Zamanında başvuran, karar verilene kadar kalabilir. Daire bunun için Fiktionsbescheinigung düzenler.",
        "İşveren ve Jobcenter çoğu zaman kanıt ister – Fiktionsbescheinigung'u veya başvurunuzu gösterin.",
        "Sorun olursa hemen göçmen danışmanlığına gidin.",
      ],
      warn: "İzninizin süresi başvurudan önce dolduysa durum çok daha zorlaşır. Hemen danışmanlık alın.",
    },
    "inkasso-mahnbescheid": {
      t: "İcra takip mektubu veya mahkeme ödeme emri",
      s: "Bir şirket veya mahkeme, iddia edilen bir borç için para istiyor.",
      check: [
        "Şirketi ve talebi tanıyor musunuz? Sözleşme veya fatura var mı?",
        "Tutar doğru mu? Tahsilat ücretleri yasayla sınırlıdır.",
        "Borç eski mi? Birçok alacak 3 yıl sonra zamanaşımına uğrar (oluştuğu yılın sonundan itibaren).",
        "Mektup sarı zarfla Amtsgericht'ten mi geldi? O zaman bu bir mahkeme ödeme emridir (Mahnbescheid).",
      ],
      steps: [
        "Görmezden gelmeyin – ama aceleyle ödeme yapmayın veya bir şey imzalamayın.",
        "Bilinmeyen veya yanlış talep: yazılı itiraz edin („Ich bestreite die Forderung.“) ve kanıt isteyin.",
        "Mahkeme ödeme emri: tebliğden itibaren 2 hafta içinde itiraz – ekteki formla, bir çarpı işareti yeterlidir.",
        "Talep haklıysa ama ödeyemiyorsanız: taksit teklif edin ve borç danışmanlığına başvurun.",
        "Hesabınızı koruyun: P-Konto'ya dönüştürün.",
      ],
      warn: "Sahte tahsilat e-postalarına dikkat edin. Bağlantılara tıklamayın ve bilinmeyen hesaplara ödeme yapmayın.",
    },
    "steuerbescheid": {
      t: "Vergi dairesinden vergi tahakkuku",
      s: "Vergi dairesi verginizi hesapladı – iade veya ek ödeme ile.",
      check: [
        "Üstte „Erstattung“ (para alıyorsunuz) mu yoksa „Nachzahlung“ (ödüyorsunuz) mu yazıyor?",
        "Vergi dairesi beyannamenizden saptı mı? „Erläuterungen“ (açıklamalar) bölümüne bakın.",
        "Gelir, çocuklar ve işle ilgili giderler doğru mu?",
      ],
      steps: [
        "İtiraz (Einspruch) süresi: 1 ay.",
        "İtiraz için özel bir form gerekmez – ELSTER üzerinden de olur. Gerekçeyi ve belgeleri sonra gönderebilirsiniz.",
        "İtiraz ödemeyi otomatik olarak durdurmaz. Bunun için „Aussetzung der Vollziehung“ (icranın durdurulması) talep edin.",
        "Ödeyemiyorsanız: erteleme veya taksit isteyin – aksi halde gecikme cezaları eklenir.",
        "Yardım: Lohnsteuerhilfeverein (çalışanlar için uygun fiyatlı) veya vergi danışmanı.",
      ],
    },
    "familienkasse": {
      t: "Familienkasse belge istiyor",
      s: "Familienkasse kanıt istiyor, ör. okul veya meslek eğitimi belgesi.",
      check: [
        "Tam olarak hangi belgeler ve hangi çocuk için?",
        "Ne zamana kadar? Süre mektupta yazılı.",
        "Kindergeld numaranız (üstte, „FK“ içerir).",
      ],
      steps: [
        "Belgeleri zamanında gönderin – kopyalarını, asla asıllarını değil. Her sayfaya Kindergeld numarasını yazın.",
        "Kolay ve kanıtlı: Familienkasse çevrimiçi portalına yükleyin.",
        "Daha fazla zamana mı ihtiyacınız var (ör. okul belgeyi daha sonra verecek): süre bitmeden uzatma isteyin.",
        "Bir şey değişti mi (eğitim bitti, yurt dışına taşınma)? Hemen bildirin.",
      ],
      warn: "Cevap vermezseniz Kindergeld durdurulabilir ve geri istenebilir.",
    },
    "bussgeld": {
      t: "Para cezası: ifade formu veya ceza kararı",
      s: "Hız sınırını aşmak, yanlış park etmek gibi bir şeyle suçlanıyorsunuz.",
      check: [
        "Bu bir „Anhörungsbogen“ (ifade formu) mu yoksa „Bußgeldbescheid“ (ceza kararı) mı?",
        "Tarih, yer, plaka ve suçlama doğru mu?",
        "Ceza kararı: sarı zarftaki tebliğ tarihini not edin.",
      ],
      steps: [
        "İfade formu: kişisel bilgilerinizi vermek zorundasınız. Konu hakkında (ör. aracı kimin kullandığı) hiçbir şey söylemek zorunda değilsiniz.",
        "Ceza kararı: itiraz yalnızca tebliğden itibaren 2 hafta içinde.",
        "Ceza puanı veya ehliyete el koyma söz konusuysa avukata danışmak çoğu zaman faydalıdır.",
        "Her şey doğruysa: zamanında ödeyin, mesele kapanır.",
      ],
    },
    "nebenkosten": {
      t: "Ev sahibinden yan gider hesabı",
      s: "Ev sahibiniz bir yıllık su, ısınma, çöp vb. giderleri hesaplıyor.",
      check: [
        "Dönem: en fazla 12 ay. Hesap, dönemin bitiminden en geç 12 ay sonra elinize ulaşmalı – yoksa ev sahibi artık ek ödeme isteyemez.",
        "Peşin ödemeleriniz doğru düşüldü mü?",
        "Konut alanı ve dağıtım anahtarı doğru mu?",
      ],
      steps: [
        "Belgeleri ev sahibinin yanında inceleme hakkınız var.",
        "İtirazlarınızı aldıktan sonra 12 ay içinde yazılı olarak yapın.",
        "Bürgergeld veya sosyal yardım alıyorsanız: ek ödemeyi hemen Jobcenter'a veya sosyal yardım dairesine verin – masraflar çoğu zaman karşılanır. İadeleri bildirmeniz gerekir.",
        "Emin değil misiniz? Mieterverein'a (kiracılar derneği) sorun.",
      ],
    },
  };
})(typeof self !== "undefined" ? self : this);
