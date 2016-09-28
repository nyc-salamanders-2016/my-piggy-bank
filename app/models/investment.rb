require 'date'
class Investment < Bank

	 validates :balance,:interest_rate, presence: true

	# #  method will take in started date
	# #  will subtract started date from current date to see how many days passed
	# diff_in_days = (Date.today - old_date).to_i
	# #  will devide the number of days by 7 to see how many weeks passed
	# num_of_weeks = diff_in_days / 7
	# #  will loop through the balance and add 2% for however amount of weeks passed
	# num_of_weeks.times do |week|
	#
	# 	new_balance = bank.balance * (interest_rate.to_f + 1)
	# # end
	# # #  will resest the start date to the end of the 7 weeks
	# set_start_date = old_date + (num_of_weeks * 7)
	#
	#
	def calculate_interest
		
		diff_in_days = (Date.today - self.start_date).to_i
		num_of_weeks = diff_in_days / 7
	
		num_of_weeks.times {self.update(balance: self.balance * (self.interest_rate.to_f / 100 + 1))}

		self.start_date = start_date + (num_of_weeks * 7)
		self.save
		self.balance
	end

	def accumulate_interest()
		self.accumulate_interest

	end

end
