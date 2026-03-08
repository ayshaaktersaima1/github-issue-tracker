const createElement = (arr) => {
    const htmlElements = arr.map(el => {
        if (el === 'bug') {
            highlight = 'text-[#EF4444] bg-[#FEECEC] border-[#FECACA]';
        }
        else if (el === 'help wanted') {
            highlight = 'text-[#D97706] bg-[#FFF6D1] border-[#FDE68A]';
        }
        else if (el === 'enhancement') {
            highlight = 'text-[#00A96E] bg-[#DEFCE8] border-[#BBF7D0]';
        }
        else if (el === 'documentation') {
            highlight = 'text-purple-700 bg-purple-100 border-purple-300'
        }
        else if (el === 'good first issue') {
            highlight = 'text-blue-700 bg-blue-100 border-blue-300'
        }


        return `<span class="${highlight} border px-[7px] py-1 rounded-xl">${el}</span>`;
    });
    return (htmlElements.join(''));
}

//manage spinner
function manageSpinner(statusSpinner) {
    if (statusSpinner === true) {
        document.getElementById('cards-container').classList.add('hidden');
        document.getElementById('spinner').classList.remove('hidden');
    }
    else if (statusSpinner === false) {
        document.getElementById('cards-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

const loadAllIssues = () => {

    manageSpinner(true);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActive();
            document.getElementById('btn-all').classList.add('active-btn');
            displayAllIssues(data.data);

        });
}


const removeActive = () => {
    const allBtns = document.querySelectorAll('.tab-btn');
    allBtns.forEach(btn => btn.classList.remove('active-btn'));
}


const displayAllIssues = (issues) => {
    const count = document.getElementById('count');
    count.innerText = issues.length;


    const cardContainer = document.getElementById('cards-container');
    cardContainer.innerHTML = ``;
    issues.forEach(issue => {

        const date = issue.createdAt.split('T')[0];
        let statusImg = '';
        let topBorder = '';
        if (issue.status === 'open') {
            statusImg = 'assets/Open-Status.png';
            topBorder = 'border-t-4 border-t-[#00a96e]';

        }
        else {
            statusImg = 'assets/Closed- Status .png';
            topBorder = 'border-t-4 border-t-[#a855f7]';
        }
        // for top color border


        // high low medium

        let priorityCls = '';
        if (issue.priority === 'high') {
            priorityCls = 'text-[#EF4444] bg-[#FEECEC]';
        }
        else if (issue.priority === 'medium') {
            priorityCls = 'text-[#f59e0b] bg-[#FFF6D1]';
        }
        else if (issue.priority === 'low') {
            priorityCls = 'text-[#9ca3af] bg-[#EEEFF2]';
        }

        const card = document.createElement('div');
        card.innerHTML = `<div onclick="loadSingleIssues(${issue.id})" class="space-y-3 p-4 bg-white border border-[#E4E4E7] ${topBorder} rounded-md shadow-sm">
                <!-- 1st line -->
                <div class="flex justify-between items-center">
                    <div><img src="${statusImg}" alt=""></div>
                    <div>
                        <div id="priority-badge" class="badge ${priorityCls} text-[12px] font-medium px-4 uppercase">${issue.priority}</div>
                    </div>
                </div>
                <!-- 2nd 3rd-->
                <h2 class="black-text font-semibold text-base min-h-[48px]">${issue.title}</h2>
                <p class="gray-text text-sm min-h-[80px]">${issue.description}</p>
                <!-- 4th -->
                <div class="">
                    <div class="flex items-center gap-2 font-medium uppercase text-xs">${createElement(issue.labels)}</div>
                    
                </div>
                <!-- hr -->
                <hr class="border-gray-300">
                <!-- below -->
                <p class="gray-text text-sm">#${issue.id} by ${issue.author}</p>
                <p class="gray-text text-sm">${date}</p>

            </div>`;


        cardContainer.append(card);
    })

    manageSpinner(false);

}

loadAllIssues();
// filtering open

document.getElementById('btn-open').addEventListener('click', function () {

    manageSpinner(true);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            document.getElementById('btn-open').classList.add('active-btn');
            displayOpenissue(data.data);
        });
})

const displayOpenissue = (issues) => {

    const openIssues = issues.filter(issue => issue.status === 'open');
    displayAllIssues(openIssues);
}

// filtering closed
document.getElementById('btn-closed').addEventListener('click', function () {

    manageSpinner(true);
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            document.getElementById('btn-closed').classList.add('active-btn');
            displayClosedIssues(data.data);
        });

})

const displayClosedIssues = (issues) => {

    const closedIssues = issues.filter(issue => issue.status === 'closed');
    displayAllIssues(closedIssues);
}

// modal

const loadSingleIssues = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleIssue(data.data));
}
const displaySingleIssue = (issue) => {

    const date = issue.createdAt.split('T')[0];

    const issueCon = document.getElementById('single-Issue-Con');
    issueCon.innerHTML = `<div class="modal-box">

                <!-- card info -->
                <h2 class="text black-text text-2xl font-bold pb-2">${issue.title}</h2>
                <!-- 2nd line -->
                <div class="flex items-center pb-6 gap-3">
                    <div class="badge badge-primary font-medium text-sm">${issue.status}</div>
                    <p class="gray-text text-sm">Opened by ${issue.author}</p>
                    <p class="gray-text text-sm">${date}</p>
                </div>
                <!-- 3rd line -->
                <div class="flex items-center gap-1 pb-6">
                    <div class="badge">Primary</div>
                    <div class="badge">Primary</div>
                </div>
                <!-- des -->
                <p class="gray-text pb-6">${issue.description}</p>

                <!-- grey div -->
                <div class="flex items-center justify-start gap-35 bg-[#F8FAFC] py-4 ">
                    <div class="pl-4">
                        <h2 class="gray-text">Assignee:</h2>
                        <p class="black-text font-semibold">${issue.author}</p>
                    </div>
                    <div>
                        <p class="gray-text">Priority:</p>
                        <div class="badge">${issue.priority}</div>
                    </div>
                </div>


                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn bg-[#4a00ff] text-white">Close</button>
                    </form>
                </div>
            </div>`;

    document.getElementById('issue_Details').showModal();
}

// search

const searching = () => {

    const searchInput = document.getElementById('search-input').value;

    if (searchInput.length > 0) {
        const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayAllIssues(data.data));
    }
}