import Switch from "react-switch";
import { useRecoilState } from "recoil";
import { salesModeState } from "../../atoms/salesModeState/salesModeState";

const ToggleSwitch = ({ width, height, onColor, offColor, state, checked }) => {
    const [salesMode, setSalesMode] = useRecoilState(salesModeState);

    const handleChange = (checked) => {
        if (state === "sales") {
            setSalesMode(() => !salesMode);
        } 

    };

    return (
        <label>
            <Switch
                height={height}
                width={width}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={onColor}
                offColor={offColor}
                onChange={handleChange}
                checked={checked}
            />
        </label>
    );
};

export default ToggleSwitch;
