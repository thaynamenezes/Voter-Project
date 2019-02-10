let voters = [],
    democratCandidates = [],
    republicanCandidates = [],
    independentCandidates =[];

class Person {
  constructor(name) {
    this.name = name;
  }
}

class Voter extends Person {
  constructor(name, ideology) {
    super(name);
    this.ideology = ideology;
    voters.push(this);
  }
}

class Candidate extends Person {
  constructor(name, party) {
    super(name);
    this.party = party;
    this.votes = 0;
    if(this.party === 'Democrat') {
     democratCandidates.push(this)
    }
    else if(this.party === 'Republican') {
      republicanCandidates.push(this)
    }
    else if(this.party === 'Independent') {
      independentCandidates.push(this)
    }
  }
}

// Creating a Voter
$("#voter-form").submit(function(event){
  let voterName = $("#voter-name")[0].value,
      voterIdeology = $("#voter-ideology")[0].value;
  let voter = new Voter(voterName, voterIdeology);

  $("#voter-list > .list-group").append(`<li>Name: ${voterName}\nIdeology: ${voterIdeology}  </li>`)

  event.preventDefault();
});

// Creating a Candidate
$("#candidate-form").submit(function(event){
  let candidateName = $("#candidate-name")[0].value,
      candidateParty = $("#candidate-party")[0].value;
  let voter = new Candidate (candidateName, candidateParty);

  $("#candidate-list > .list-group").append(`<li>Name: ${candidateName}\nParty: ${candidateParty}  </li>`)

  event.preventDefault();
});

//vote function
function vote(){
voters.forEach(function(voter) {
  let num = Math.floor(Math.random() * 100) +1
  let party;

  switch (voter.ideology) {
    case "Liberal":
      if(num <= 60) {
        party = democratCandidates
      }
      else if(num <= 80) {
        party = independentCandidates
      }
      else {
        party = republicanCandidates
      }
      break;

    case "Neutral":
      if(num <= 50) {
        party = independentCandidates
      }
      else if(num <= 75) {
        party = democratCandidates
      }
      else {
        party = republicanCandidates
      }
      break;

    case "Conservative":
      if(num <= 60) {
        party = republicanCandidates
      }
      else if(num <= 80) {
        party = independentCandidates
      }
      else {
        party = democratCandidates
      }
      break;

  }
  candidate = party[Math.floor(Math.random() * party.length)]
  candidate.votes++;
})

let allCandidates = democratCandidates.concat(independentCandidates,  republicanCandidates);

console.log(allCandidates);

let winner = allCandidates[0]
allCandidates.forEach(function(politician) {
  if(politician.votes > winner.votes) {
    winner = politician;
  }
})
alert(winner.name)
}

// Click on vote button
$(".btn-danger").click(function(){
  vote();
  event.preventDefault();
})
