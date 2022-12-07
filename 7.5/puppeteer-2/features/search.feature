Feature: Ticket booking
    Scenario: Must book ticket
        Given user is on "/index.phpta" page
        When the user will be redirected to the seat selection page ""
        Then user sees the title of the movie "Логан"