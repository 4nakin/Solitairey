YUI.add("canfield", function (Y) {

var Solitaire = Y.Solitaire,
    Agnes = Solitaire.Agnes,
    Klondike = Solitaire.Klondike,
    Canfield = Solitaire.Canfield = instance(Agnes, {
	height: Solitaire.height,
	maxStackHeight: Solitaire.maxStackHeight,

	createEvents: function () {
		Solitaire.createEvents.call(this);
		Y.on("solitaire|endTurn", this.fillTableau.bind(this));
	},

	fillTableau: function () {
		var reserve = this.reserve.stacks[0],
		    card = reserve.last(),
		    empty;

		if (!card) { return; }

		empty = Y.Array.find(this.tableau.stacks, function (stack) {
			return !stack.last();
		});

		if (empty) {
			card.faceUp().moveTo(empty);
		}

		card = reserve.last();
		
		if (card.isFaceDown) {
			card.faceUp();
		}
	},

	redeal: Klondike.redeal,
	turnOver: Klondike.turnOver,

	deal: function () {
		var card,
		    deck = this.deck,
		    tableau = this.tableau.stacks,
		    reserve = this.reserve.stacks[0],
		    reserveSize = 13,
		    i;

		for (i = 0; i < tableau.length; i++) {
			tableau[i].push(deck.pop().faceUp());
		}

		for (i = 0; i < reserveSize; i++) {
			card = deck.pop();
			if (i === reserveSize - 1) {
				card.faceUp();
			}
			reserve.push(card);
		}

		this.foundation.stacks[0].push(deck.pop().faceUp());

		deck.createStack();
	},

	Tableau: instance(Agnes.Tableau, {
		stackConfig: {
			total: 4,
			layout: {
				hspacing: 1.25,
				top: function () { return Solitaire.Card.height * 1.5; },
				left: function () { return Solitaire.Card.width * 3.75; }
			}
		},
	}),

	Reserve: instance(Agnes.Reserve, {
		stackConfig: {
			total: 1,
			layout: {
				left: function () { return Solitaire.Card.width * 1.5 },
				top: function () { return Solitaire.Card.height * 1.5; }
			}
		},
	}),

	Waste: Klondike.Waste,

	Card: instance(Agnes.Card, {
		validFreeTableauTarget: function () {
			return true;
		}
	})
});

}, "1.0.0", {requires: ["agnes"]});
