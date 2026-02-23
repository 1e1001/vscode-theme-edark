#![rustfmt::skip]
// This is a demo of vscode-theme-edark

/* Comments:
"Prose" (comments, plain text) is colored entirely white.
I believe that code should be mostly self-describing,
	with comments providing documentation and reasoning (e.g. rust "SAFETY:" comments).
Having prose be the brightest makes it stand out as important.

The other colors represent particular categories of information, their vague definitions follow:
 Structure: in red, these represent control flow syntax and operators.
            	Note that brackets instead alternate through RGB colors, to make identifying depths easier
     Place: in green, something that can be read/written, a variable value, constant, structure field, etc.
    Module: in purple, an organization of things, also known as a namespace
  Function: in blue, something that applies a transformation to its arguments, a traditional function, and rust attributes.
  Constant: in yellow, a "magic" value in the program, like number, string, or boolean literals.
      Type: in cyan, some information used at compile time, possibly about a place.

The following example contains all 7 colors of text:
*/

fn main() {
	match Command::parse() {
		Command::RandomTree { count, output } => main_random_tree(count, output),
		Command::MatrixTree { input, output } => main_matrix_tree(input, output),
		Command::TreeMatrix {
			input,
			output,
			c_format,
		} => main_tree_matrix(input, output, c_format),
		Command::TreeLayout {
			input,
			output,
			quiet,
		} => layout::main_tree_layout(input, output, quiet),
		Command::LineLayout { input, output } => layout::main_line_layout(input, output, true),
		// Prose →       ↑ Type     Structure ↑    ↑ Module  Function ↑   ↑ Place  Constant ↑
		//cmd => todo!("{cmd:?}"),
	}
	eprintln!("done");
}
