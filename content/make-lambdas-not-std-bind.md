Title: Make lambdas, not std::bind
Tags: C++, C++11
Date: 2016-09-26
Category: Programming
Slug: make-lambdas-not-std-bind

In C++11, `std::bind` is a way to achieve partial application of a function. In 
other words, you can pre-fill some of a function's parameters, thus creating a 
new function. It's also possible to make a callback to a method on a particular 
instance of an object. 

~~~~~~~~~~~~~C++
#include <iostream>
#include <functional>

struct my_struct
{
	int two_times(int x)
	{
		return 2 * x;
	}
};

void print(std::string msg)
{
	std::cout << msg << std::endl;
}

int main(int argc, char **argv)
{
	auto print_hello = std::bind(print, "hello");
	print_hello(); // prints "hello"

	my_struct a;
	auto two_times_three = std::bind(&my_struct::two_times, a, 3);
	print(std::to_string(two_times_three())); // prints "6"

	return 0;
}
~~~~~~~~~~~~~

So, why does `std::bind` suck? Note that we use an `auto` declaration whenever 
we use it in the example. This is for a very good reason - according to the 
C++11 specification, its result type is unspecified. Sure, we can expect it will 
be callable, but that's pretty much it. This becomes a problem when we want to 
pass a bound function to another function as a callback. The only practical way 
of doing so would be making that function a template that has the function type 
as a parameter.

I'm not saying that function templates are bad (well, they kinda are - seen 
those weird, mile-long error messages from the compiler when you screw someting 
up?), but C++11 also has the `std::function` type template that we can use as a 
parameter type in our callback-requesting function. The only drawback is that we 
have to be a bit more verbose - `std::function` is constructed using a functor 
(or a lambda).

~~~~~~~~~~~~~C++
int main(int argc, char **argv)
{
	std::function<void()> print_hello = [](){ print("hello"); };
	print_hello(); // prints "hello"

	my_struct a;
	std::function<int()> two_times_three = [&a](){ return a.two_times(3); };
	print(std::to_string(two_times_three())); // prints "6"

	return 0;
}
~~~~~~~~~~~~~

This looks a bit longer than the example with `std::bind`, but it is arguably 
more readable - especially the callback to a member function. However, the main 
advantage of this approach is that our callbacks now have a well defined type.
