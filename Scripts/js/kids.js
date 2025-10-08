$(() => {
  //کد دکمه دریافت مشاوره
  let consultBtn = document.getElementById("getConsult")
  let consultModal = document.getElementById("consultModal")
  if (consultBtn && consultModal) {
    consultBtn.addEventListener("click", () => {
      consultModal.style = ""
      let close = consultModal.querySelector("i")
      callModal.custom("fitContent", (showModal, closeModal) => {
        showModal(consultModal)
        close.addEventListener("click", closeModal)
        consultModal.querySelector("button").addEventListener("click", () => {
          validateSection(consultModal).then(() => {
            alert(extractData(consultModal))
            closeModal().then(() => callModal.success("اطلاعات شما با موفقیت ثبت شد. کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت."))
          })
        }, {once: true})
      })
    })
  }
  const extractData = (consultModal) => {
    let age = $(consultModal).find("#childAge").val()
    let name = $(consultModal).find("#childName").val()
    let num = $(consultModal).find("#parentNumber").val()
    return {childName: name, parentNumber: num, childAge: age}
  }
})
