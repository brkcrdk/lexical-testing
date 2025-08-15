# lexical-testing
Lexical öğrenme reposu

TODOS:
- [x] Headingden shift+enter desteğeni kapatalım.
- [ ] Boşluğa tıkladığımızda en son satır eğer boş pararaph elementi değilse yeni bir paragraph elementi oluşturalım
  - [x] Main-heading elementi,
  - [x] Custom-paragraph elementi,
  - [ ] Quote elementi
  - [ ] Liste elementinde en son liste elementi boşsa
- [x] Paragraph nodelarında hover olduğu zaman placeholder görünür olmalı.
- [x] Blockların sol tarafına yönetim alanı eklenmeli.
- [x] Bu yönetim alanı sadece hover yapıldığı zaman görünür olmalı.
- [x] Inline node ekleme dropdownu eklenmeli.
- [ ] Yönetim alanına eklenen artı butonuna tıklanıldığı zaman default olarak paragraph node eklenmeli ve bu node seçme alanı açılmalı.
- [x] Herhangi bir text nodeunda `/` yazıldığında yine bu dropdown açılmalı.
- [x] Yönetim alanından nodelar sürüklenip bırakılabilmeli.
- [ ] Quote bloğu eklenmeli.
- [ ] PDF bloğu eklenmeli.
- [x] Eğer sürükleme bırakma işlemi headerın üstüne olacak şekilde olursa izin verilmemeli.
- [x] Slash commandi yazıldığında slash badge node eklenmeli:
  - [x] ESC ye basıldığında slash badge silinmeli ve yazılan içerik texte dönüştürülmeli.
  - [x] Slash-node yaklaşımını typeaheadde yer alan anchor ref elementine before ekelyerek çözeceğiz. Bu işimizi görüyor.
  - [x] Slash-nodeu kaldıracağız.
  - [x] Kullanıcı slash yazdığı anda sonrasında bir text ekleyip /filter veya /type-to-filter şekilinde bir yazı ile dolduracağız. Bu textler whitelist olacak ve tüm optionları return edecekler.
  - [x] Slashten sonra eklenen textin rengini güncellemeliyiz. Böylece placeholder gibi görünmesini sağlayabiliriz.
  - [x] Typeahead'in sadece slash-badge nodeunda çalışmasını sağlayıp, slashe basınca da sadece slash-badge çıkmasını sağlayabiliriz. Böylece dropdow'un sadece slash-badgede çıkmassını sağlayabilir ve aramalar yaparken textte çıkmamaasını garanti etmiş olabiliriz.