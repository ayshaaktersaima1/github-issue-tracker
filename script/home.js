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

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"


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
            priorityCls = 'text-[#EF4444] bg-[#EF4444]/20';
        }
        else if (issue.priority === 'medium') {
            priorityCls = 'text-[#f59e0b] bg-[#f59e0b]/20';
        }
        else if (issue.priority === 'low') {
            priorityCls = 'text-[#9ca3af] bg-[#9ca3af]/20';
        }

        const card = document.createElement('div');
        card.innerHTML = `<div class="space-y-3 p-4 bg-white border border-[#E4E4E7] ${topBorder} rounded-md shadow-sm">
                <!-- 1st line -->
                <div class="flex justify-between items-center">
                    <div><img src="${statusImg}" alt=""></div>
                    <div>
                        <div id="priority-badge" class="badge ${priorityCls} text-[12px] font-medium px-4">${issue.priority}</div>
                    </div>
                </div>
                <!-- 2nd 3rd-->
                <h2 class="black-text font-semibold text-base min-h-[48px]">${issue.title}</h2>
                <p class="gray-text text-sm min-h-[80px]">${issue.description}</p>
                <!-- 4th -->
                <div class="flex items-center justify-between">
                    <div class="badge text-[12px] font-medium">Bug</div>
                    <div class="badge text-[12px] font-medium">help wanted</div>
                </div>
                <!-- hr -->
                <hr class="border-gray-300">
                <!-- below -->
                <p class="gray-text text-sm">#${issue.id} by ${issue.author}</p>
                <p class="gray-text text-sm">${date}</p>

            </div>`;

        cardContainer.append(card)
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