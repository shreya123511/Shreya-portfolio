"""
This module implements a Noughts and Crosses (Tic-Tac-Toe) game.
"""

from noughtsandcrosses import (
    welcome, menu, play_game, save_score, load_scores, display_leaderboard
)

def main():
    """
    Main function to run the Noughts and Crosses game.
    """
    board = [['1', '2', '3'],
             ['4', '5', '6'],
             ['7', '8', '9']]

    welcome(board)
    total_score = 0

    while True:
        choice = menu()
        if choice == '1':
            try:
                score = play_game(board)
                total_score += score
                print('Your current score is:', total_score)
            except TypeError as e:
                print(f"Error: {e}")
        elif choice == '2':
            try:
                save_score(total_score)
            except IOError as e:
                print(f"Error: {e}")
        elif choice == '3':
            try:
                leader_board = load_scores()
                display_leaderboard(leader_board)
            except IOError as e:
                print(f"Error: {e}")
        elif choice == 'q':
            print('Thank you for playing the "Unbeatable Noughts and Crosses" game.')
            print('Goodbye!')
            break
        else:
            print("Invalid choice. Please choose a valid option.")

if __name__ == '__main__':
    main()
