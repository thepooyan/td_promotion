function runPackageInCourse() {
    $('.packageInCourse > .titr').click('click', function () {
        $(this).next('.p-collapsibleContent').slideToggle(300);
        $(this).next('.p-collapsibleContent').css('display', 'flex');
    });
    $('.packageInCourse .p-collapsibleSection .title').on('click', function () {
        $(this).toggleClass('active');
        $(this).next('.content').slideToggle(300);
        $(this).next('.content').css('display', 'flex');
    });

    const videoElements = document.querySelectorAll('.packageInCourse .item .viewBtn')
    if (videoElements && videoElements.length)
        videoElements.forEach(elem => elem.addEventListener('click', function () {
            showVideo(elem)
        }))

}
function fetchPackageSection() {
    const packageSectionTags = dc.queries(".package-section")
  
    packageSectionTags.forEach(tvTag => {   
        fetch(`/PackageHome/GetPackageInSection`)
            .then(response => response.text())
            .then(html => {
                tvTag.innerHTML = html;
                runPackageInCourse();
            })
    })

    $(document).on('click', '.package-section-item', function () {        
        $(this).parent().find('.package-video').hide();
        $(this).find('.package-video').show();
    })

    $(document).on('click', '.p-section', function () {        

        if ($(this).hasClass('fetched'))
            return;
        var id = $(this).attr('data-sectionid')
        var contentDiv = $(this).find('.content');
        $(this).addClass('fetched')
        fetch(`/PackageHome/GetPackageVideoInSection?id=${id}`)
            .then(response => response.text())
            .then(html => {
                $(this).addClass('fetched')
                contentDiv.html(html);
                setTimeout(() => {
                    runSampleVideosOf(contentDiv);//this function come from js.js file
                    var seeMore = $(contentDiv).find('.seeMore')[0];
                    $(seeMore).on('click', function () {
                        $(this).parents('#videoGridContainer').toggleClass('active');
                        $(this).toggleClass('active');
                    });
                }, 300)
            })
    })
}

function handleOpenInModalPackage() {
    $(document).on('click', '.close-custom-modal', function (e) {
        $('.modal-custom').hide()
    })
    $(document).on('click', '.open-in-modal', function (e) {
        e.stopPropagation()
        e.preventDefault()

        // get data
        const slug = $(this).attr('href')
        fetch(`/packageHome/GetPackageInModal?slug=${slug}`)
            .then(response => response.text())
            .then(OpenModal)


        return false;
    })
}

function OpenModal(html) {
    const modal = $('.modal-custom')
    const modalBody = $('.modal-custom .modal-custom-body')
    modalBody.html(html);
    modal.show()
}


async function showVideo(elem) {
    if (!elem.clicked) {
        elem.clicked = true;
        const itemElement = elem.parentElement;
        const slug = itemElement.getAttribute('data-slug')
        const divider = itemElement.querySelector('.showVideoDivider')
        if (divider && divider.childElementCount == 0) {
            const data = await getVideo(slug);
            if (!data) return;

            const video = document.createElement('video')
            video.src = data.src;
            video.poster = data.cover;
            video.controls = true;
            video.classList.add('exception');

            divider.append(video);
            divider.classList.add('active');
        }
    }
    
    toggleVideoDivider(divider)
}
function toggleVideoDivider(elem) { (elem.classList.contains('hide') && openVideoDivider(elem)) || (!elem.classList.contains('hide') && closeVideoDivider(elem)) }
function openVideoDivider (elem) {elem.classList.contains('hide') && elem.classList.remove('hide');}
function closeVideoDivider(elem) { !elem.classList.contains('hide') && elem.classList.add('hide'); }

async  function getVideo (slug) {
    const result = await fetch(`/packageHome/GetVideoBySlug?slug=${slug}&download=false`)
    return await result.json()
}



$(function () {
    fetchPackageSection();
    handleOpenInModalPackage();
})

