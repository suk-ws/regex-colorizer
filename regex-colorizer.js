
class RegexColorizer {
	
	static coloringAll (class_name = "regex") {
		
		for (let node of document.getElementsByClassName(class_name)) {
			
			var regex = node.innerText;
			var output = "";
			
			var in_set = false;
			var in_group = 0;
			var has_group = 0;
			for (let i = 0; i < regex.length; i++) {
				
				var i_content = "";
				var i_type = "";
				var i_prefix = null;
				var i_suffix = null;
				
				var i_content = regex[i];
				switch (regex[i]) {
					case "^":
					case "$":
						i_type = "reg-anchor";
						break;
					case "?":
					case "+":
					case "*":
						i_type = "reg-quantifier";
						break;
					case "\\":
						i++; i_content += regex[i];
						if ("dDsSvwW".includes(regex[i])) {
							i_type = "reg-cclass";
						} else if ("bB".includes(regex[i])) {
							i_type = "reg-anchor";
						} else if (regex[i] == "u") {
							if (
								"0123456789abcdef".includes(regex[i+1]) &&
								"0123456789abcdef".includes(regex[i+2]) &&
								"0123456789abcdef".includes(regex[i+3]) &&
								"0123456789abcdef".includes(regex[i+4])
							) {
								i_content += regex[i+1] + regex[i+2] + regex[i+3] + regex[i+4];
								i+=4;
							}
							i_type = "reg-cescape";
						} else if (regex[i] == "x") {
							if ("0123456789abcdef".includes(regex[i+1])) {
								i++; i_content += regex[i];
								if ("0123456789abcdef".includes(regex[i+1])) {
									i++; i_content += regex[i];
								}
							}
							i_type = "reg-cescape";
						} else if ("0123456789".includes(regex[i])) {
							if (
								"01234567".includes(regex[i]) &&
								"01234567".includes(regex[i+1]) &&
								"01234567".includes(regex[i+2])
							) {
								i_content += regex[i+1] + regex[i+2];
								i+=2;
								i_type = "reg-cescape";
							} else {
								var ref = regex[i];
								if ("0123456789".includes(regex[i+1])) {
									i++;
									ref += regex[i];
									i_content += regex[i];
								}
								if (ref <= has_group) {
									i_type = "reg-ref";
								} else if (ref.length == 1 || (
									"01234567".includes(ref[0]) &&
									"01234567".includes(ref[1])
								)) {
									i_type = "reg-cescape";
								} else {
									i_type = "reg-ref reg-error";
								}
							}
						} else {
							i_type = "reg-cescape";
						}
						break;
					case "(":
						i_type = "reg-group-tag";
						i_prefix = "reg-group";
						if (regex[i+1] == "?") {
							if (":=!".includes(regex[i+2])) {
								i_content += regex[i+1];
								i_content += regex[i+2];
								i+=2;
							} else if ("<"==regex[i+2] && "=!".includes(regex[i+3])) {
								i_content += regex[i+1];
								i_content += regex[i+2];
								i_content += regex[i+3];
								i+=3;
							}
						} else {
							has_group++;
						}
						in_group++;
						break;
					case ")":
						if (in_group > 0) {
							i_type = "reg-group-tag";
							i_suffix = "reg-group";
							in_group--;
						} else {
							i_type = "reg-char reg-error";
						}
						break;
					case "[":
						if (in_set) {
							i_type = "reg-char";
						} else {
							i_type = "reg-set-tag";
							i_prefix = "reg-set";
							if (regex[i+1] == "^") {
								i_content = regex[i+1];
								i++;
							}
							in_set = true;
						}
						break;
					case "]":
						if (in_set) {
							i_type = "reg-set-tag";
							i_suffix = "reg-set";
						} else {
							i_type = "reg-char";
						}
						break;
					case "-":
						if (in_set && !(regex[i+1]=="]")) {
							i_type = "reg-set-tag";
						} else {
							i_type = "reg-char";
						}
						break;
					case "{":
						var vaild = true;
						var closed = false;
						var has_sepetar = false;
						var this_counter = regex[i];
						var c = 0;
						for (c=1; !closed && vaild && i+c < regex.length; c++) {
							this_counter += regex[i+c];
							if ("0123456789".includes(regex[i+c])) {
							} else if (regex[i+c] == ",") {
								if (c == 1 || has_sepetar) vaild = false;
								has_sepetar = true;
							} else if (regex[i+c] == "}") {
								if (c == 1) vaild = false;
								closed = true;
							} else {
								vaild = false;
							}
						}
						if (vaild) {
							i_content = this_counter;
							i_type = "reg-quantifier";
							i += c-1;
						} else {
							i_type = "reg-char";
						}
						break;
					default:
						i_type = "reg-char";
				}
				
				if (i_prefix != null) output += `<span class='${i_prefix}'>`;
				output += `<span class='${i_type}'>${i_content}</span>`;
				if (i_suffix != null) output += `</span>`;
				
			}
			
			node.innerHTML = output;
			
		}
		
	}
	
}
