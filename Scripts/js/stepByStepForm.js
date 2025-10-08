const validateMobile = (mobile) => {
  if (!mobile.match(/[0-9]/)) return "شماره موبایل باید عدد باشد"
  if (mobile.length !== 11) return "شماره موبایل باید ۱۱ رقم باشد"
  if (!mobile.startsWith("09")) return "شماره موبایل باید با 09 شروع شود"

  return null
}
const callResultModal = (text, link) => {
  let resultModal = $("#testResaultModal");
  if (!resultModal[0]) throw new Error("Result modal not found");
  resultModal.show();
  resultModal.find(".bigTxt").text(text);
  resultModal.find(".seeMore").attr("href", link);  
  callModal.fitContent(resultModal[0]);
};

const stepByStepForm = {
  questions: [
    {
      title: "فرزند شما چند سال دارد؟",
      options: [
        { text: "8-12 سال", id: "q1-1" },
        { text: "12-15 سال", id: "q1-2" },
        { text: "15-18 سال", id: "q1-3" },
      ],
      conditionToShow: [""],
    },
    {
      title: "آیا فرزند شما با مفاهیم پایه کامپیوتر (ICDL) آشناست؟",
      options: [
        { text: "بله", id: "q2-1" },
        { text: "خیر", id: "q2-2" },
      ],
      conditionToShow: ["q1-1", "q1-2", "q1-3"],
    },
    {
      title: "آیا فرزند شما با اسکرچ آشنایی دارد؟",
      options: [
        { text: "بله، اسکرچ ۱ را بلدم", id: "q3-1" },
        { text: "بله، اسکرچ ۲ را بلدم", id: "q3-2" },
        { text: "خیر، اصلاً برنامه‌نویسی بلد نیستم", id: "q3-3" },
      ],
      conditionToShow: ["q1-1q2-1"],
    },
    {
      title: "کدام یک از این سطوح را بلد هستید؟",
      options: [
        { text: "پایتون ۱ (مقدماتی)", id: "q4-1" },
        { text: "پایتون ۲ (پیشرفته)", id: "q4-2" },
        { text: "پایتون ۳ (پروژه محور)", id: "q4-3" },
        { text: "بلد نیستم", id: "q4-4" },
      ],
      conditionToShow: ["q1-1q2-1q3-2"],
    },
    {
      title: "آیا فرزند شما برنامه‌نویسی بلد است؟",
      options: [
        { text: "بله (پایتون یا طراحی سایت)", id: "q5-1" },
        { text: "خیر", id: "q5-2" },
      ],
      conditionToShow: ["q1-2q2-1", "q1-3q2-1"],
    },
    {
      title: "انتخاب سطح پایتون",
      options: [
        { text: "پایتون 1", id: "q6-1" },
        { text: "پایتون 2", id: "q6-2" },
        { text: "پایتون 3", id: "q6-3" },
      ],
      conditionToShow: ["q1-2q2-1q5-1", "q1-3q2-1q5-1"],
    },
    {
      title: "سطح آشنایی با طراحی سایت",
      options: [
        { text: "HTML & CSS", id: "q7-1" },
        { text: "WordPress", id: "q7-2" },
        { text: "Bootstrap & JavaScript", id: "q7-3" },
      ],
      conditionToShow: [
        "q1-2q2-1q5-1q6-1",
        "q1-2q2-1q5-1q6-2",
        "q1-2q2-1q5-1q6-3",
        "q1-3q2-1q5-1q6-1",
        "q1-3q2-1q5-1q6-2",
        "q1-3q2-1q5-1q6-3",
      ],
    },
    {
      title: "اطلاعات تماس",
      contactForm: true,
      conditionToShow: [
        "q1-2q2-1q5-1q6-1q7-1",
        "q1-2q2-1q5-1q6-2q7-1",
        "q1-2q2-1q5-1q6-3q7-1",
        "q1-3q2-1q5-1q6-1q7-1",
        "q1-3q2-1q5-1q6-2q7-1",
        "q1-3q2-1q5-1q6-3q7-1",
        "q1-2q2-1q5-1q6-1q7-2",
        "q1-2q2-1q5-1q6-2q7-2",
        "q1-2q2-1q5-1q6-3q7-2",
        "q1-3q2-1q5-1q6-1q7-2",
        "q1-3q2-1q5-1q6-2q7-2",
        "q1-3q2-1q5-1q6-3q7-2",
        "q1-2q2-1q5-1q6-1q7-3",
        "q1-2q2-1q5-1q6-2q7-3",
        "q1-2q2-1q5-1q6-3q7-3",
        "q1-3q2-1q5-1q6-1q7-3",
        "q1-3q2-1q5-1q6-2q7-3",
        "q1-3q2-1q5-1q6-3q7-3",
        "q1-2q2-1q5-2",
        "q1-3q2-1q5-2",
        "q1-1q2-1q3-2q4-4",
        "q1-1q2-1q3-2q4-1",
        "q1-1q2-1q3-2q4-2",
        "q1-1q2-1q3-2q4-3",
        "q1-1q2-1q3-1",
        "q1-1q2-2",
        "q1-2q2-2",
        "q1-3q2-2",
        "q1-1q2-1q3-3",
      ],
    },

    // The existing final steps.
    { title: "دوره WordPress", final: true, link: "link-for-wordpress" },
    {
      title: "دوره Bootstrap & JavaScript",
      final: true,
      link: "link-for-bootstrap",
    },
    { title: "دوره React.js", final: true, link: "link-for-react" },
    { title: "دوره طراحی سایت", final: true, link: "link-for-web-design" },
    { title: "دوره پایتون 1", final: true, link: "link-for-python1" },
    { title: "دوره پایتون 2", final: true, link: "link-for-python2" },
    { title: "دوره پایتون 3", final: true, link: "link-for-python3" },
    { title: "هوش مصنوعی مقدماتی", final: true, link: "link-for-ai" },
    { title: "دوره اسکرچ 2", final: true, link: "link-for-scratch2" },
    { title: "دوره ICDL کودکان", final: true, link: "link-for-icdl-kids" },
    { title: "دوره ICDL", final: true, link: "link-for-icdl" },
    { title: "دوره اسکرچ 1", final: true, link: "link-for-scratch1" },
  ],
  answers: "",
  prevAnswers: [],
};

$("#prevBtn").on("click", () => {
  const prevAnswer = stepByStepForm.prevAnswers.pop();
  stepByStepForm.answers = prevAnswer ? prevAnswer : "";
  renderQuestion();
});

const renderQuestion = () => {
  $("#title").text("");
  document.querySelector("#questions-section").innerHTML = "";

  if (stepByStepForm.answers.length > 0) {
    $("#prevBtn").show();
  } else {
    $("#prevBtn").hide();
  }

  const currentStep = stepByStepForm.questions.find(
    (q) =>
      q.conditionToShow && q.conditionToShow.includes(stepByStepForm.answers),
  );

  if (!currentStep) return;

  const { title, options, contactForm, final, link } = currentStep;

  if (contactForm) {
    $("#title").text(title);
    const formHtml = `
<p>تبریک! نتیجه آزمون مشخص شد. لطفا اطلاعات زیر را کامل کنید تا نتیجه را مشاه کنید</p>
<input type="text" id="userName" placeholder="نام و نام خانوادگی دانش آموز">
<input type="tel" id="userNumber" placeholder="شماره موبایل والدین">
<button id="submitContact">مشاهده نتیجه</button>`;
    $("#questions-section").html(formHtml);

    $("#submitContact").on("click", () => {
      const name = $("#userName").val();
      const number = $("#userNumber").val();
      

      if (name && number) {
        let error = validateMobile(number); 
        if (error) return callModal.fail(error)
        alert(`name: ${name} num: ${number}`);

        const finalStep = stepByStepForm.questions.find(
          (q) => q.final && q.link,
        );
        if (finalStep) {
          callResultModal(finalStep.title, finalStep.link);
        }
      } else {
        callModal.fail("لطفاً نام و شماره تماس خود را وارد کنید.");
      }
    });
  } else if (final) {
    // This part is now redundant, but kept for clarity.
    // The contact form is now the only "final" step that gets to the modal.
    callResultModal(title, link);
  } else if (options) {
    $("#title").text(title);
    options.forEach(({ text, id, selected }) => {
      const div = $("<div>")
        .text(text)
        .addClass("item")
        .on("click", function() {
          stepByStepForm.prevAnswers.push(stepByStepForm.answers);
          stepByStepForm.answers += id;
          currentStep.options.forEach((option) => {
            if (option.id === id) {
              option.selected = true;
            } else {
              option.selected = false;
            }
          });
          $(this).addClass("active");
          setTimeout(() => {
            renderQuestion();
          }, 500);
        });
      if (selected) {
        $(div).addClass("active");
      }
      $("#questions-section").append(div);
    });
  }
};

renderQuestion();
